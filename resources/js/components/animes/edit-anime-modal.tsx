import { useForm } from "@inertiajs/react";
import { type Anime, Genre } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import MultiSelect from "@/components/games/multi-select";
import { MonitorPause, RotateCcw } from "lucide-react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    genres: Genre[];
    anime: Anime;
}


export default function EditAnimeModal({open,onOpenChange,genres,anime}: Props) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        transform
    } = useForm({
        _method: "PUT",
        title: anime.title,
        original_title: anime.original_title || "",
        status: anime.status,
        description: anime.description || "",
        img_type: "url",
        url: anime.cover_url || "",
        image: null as File | null,
        rating: anime.rating || 0,
        genres: anime.genres?.map((genre) => genre.id) || [],
        updateCoverUrl: false as boolean,
    });

    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        transform((data) => ({
            ...data,
            ...(data.url === anime.cover_url && {
                url: undefined,
                updateCoverURL: false,
            }),
        }));

        post(route("animes.update", anime.id), {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                toast.success("The anime has been saved.", { position: "top-right" });
                reset();
                onOpenChange(false);
            },

            onError: (errors) => {
                toast.error(errors.error, { position: "top-right" });
            },
        });
    }

    const coverPreview = data.image ? URL.createObjectURL(data.image) : data.url || null;

    function resetCover() {
        setData("image", null);
        setData("url", anime.cover_url || '');
        setData("img_type", 'url');
        setData("updateCoverUrl", false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-6xl p-0 flex flex-col" onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader className="border-b p-6">
                    <DialogTitle>
                        {anime.title}
                    </DialogTitle>

                    <DialogDescription>
                        {anime.original_title}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} method="post" className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1">
                        <div className="grid grid-cols-12 gap-8 p-6">
                            <div className="col-span-3">
                                <div className="aspect-[2/3] overflow-hidden rounded-xl border bg-muted">
                                    {coverPreview ? (
                                        <img
                                            src={coverPreview}
                                            className="object-fill"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <MonitorPause className="h-20 w-20 text-muted-foreground/40"/>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <Label>Cover</Label>
                                    <Tabs defaultValue="URL">
                                        <TabsList>
                                            <TabsTrigger value="URL">URL</TabsTrigger>
                                            <TabsTrigger value="Upload">Upload</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="URL">
                                            <div className="flex items-center gap-0">
                                                <Input
                                                    className="rounded-r-none"
                                                    placeholder="https://..."
                                                    value={data.url}
                                                    onChange={(e) => {
                                                        setData("url", e.target.value);
                                                        setData("img_type", 'url');
                                                        setData("updateCoverUrl", true);
                                                        if (e.target.value) {
                                                            setData("image", null);
                                                        }
                                                    }}
                                                    />
                                                <Button type="button" className="rounded-l-none border-l" variant="ghost" onClick={() => resetCover()}>
                                                    <RotateCcw />
                                                </Button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="Upload">
                                            <div className="flex items-center gap-0">
                                                <Button
                                                    className="bg-violet-500 hover:bg-violet-700 text-white rounded-r-none p-1" 
                                                    type="button" asChild size="sm"
                                                >
                                                    <label htmlFor="cover-img">
                                                        Select image
                                                    </label>
                                                </Button>
                                                <span className="text-sm text-muted-foreground truncate pl-2 pr-2">
                                                    {data.image instanceof File
                                                        ? data.image.name
                                                        : "No file selected"}
                                                </span>
                                                <Button type="button" className="rounded-l-none border-l" variant="ghost" onClick={() => resetCover()}>
                                                    <RotateCcw />
                                                </Button>
                                                <Input
                                                    id="cover-img"
                                                    className="hidden"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        setData("image", file ?? null);
                                                        if (file) {
                                                            setData("url", "");
                                                            setData("img_type", 'upload');
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    {errors.image && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.image}
                                        </p>
                                    )}
                                    {errors.url && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.url}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* Form */}
                            <div className="col-span-9 space-y-6">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2">
                                        <Label>Title</Label>
                                        <Input
                                            autoFocus
                                            value={data.title}
                                            onChange={(e) => setData("title", e.target.value)}
                                        />

                                        {errors.title && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <Label>Original Title</Label>
                                        <Input
                                            value={data.original_title}
                                            onChange={(e) => setData("original_title", e.target.value)}
                                        />

                                        {errors.original_title && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.original_title}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <Label>Genres</Label>
                                        <MultiSelect
                                            options={genres}
                                            value={data.genres}
                                            onChange={(value) => setData("genres", value)}
                                            getValue={(genre) => genre.id}
                                            getLabel={(genre) => genre.genre}
                                        />
                                    </div>

                                    <div className="col-span-1">
                                        <Label>Status</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) =>setData("status",value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Backlog">
                                                    Backlog
                                                </SelectItem>
                                                <SelectItem value="Watching">
                                                    Watching
                                                </SelectItem>
                                                <SelectItem value="Completed">
                                                    Completed
                                                </SelectItem>
                                                <SelectItem value="Paused">
                                                    Paused
                                                </SelectItem>
                                                <SelectItem value="Dropped">
                                                    Dropped
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="col-span-1">
                                        <Label>Rating ({data.rating}/5)</Label>
                                        <Slider
                                            className="mt-4"
                                            min={0}
                                            max={5}
                                            step={1}
                                            value={[data.rating]}
                                            onValueChange={(value) => setData("rating", value[0])}
                                        />

                                        {errors.rating && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.rating}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            rows={4}
                                            value={data.description}
                                            onChange={(e) => setData("description",e.target.value)}
                                        />

                                        {errors.description && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter className="border-t p-6">
                        <Button
                            className="hover:bg-neutral-700 text-white bg-neutral-500 hover:text-white"
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                onOpenChange(false)
                            }}
                            disabled={processing}
                        >
                            Cancel
                        </Button>

                        <Button
                            className="hover:bg-violet-700 text-white bg-violet-500"
                            type="submit"
                            disabled={processing}
                        >
                            {processing
                                ? "Saving..."
                                : "Save"}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}