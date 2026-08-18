import { useForm, usePage } from "@inertiajs/react";
import type { Auth, Genre } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import MultiSelect from "@/components/games/multi-select";
import { MonitorPause, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    genres: Genre[];
}

export default function AddAnimeModal({open,onOpenChange,genres}: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        user_id: auth.user.id,
        title: "",
        original_title: "",
        status: "Backlog",
        description: "",
        genres: [] as number[],
        cover_type: "",
        url: "",
        image: null as File | null,
        rating: 0,
    });

    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route("animes.store"), {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                toast.success("Anime has been saved.", { position: "top-right" });
                reset();
                onOpenChange(false);
            },

            onError: (errors) => {
                toast.error(errors.error, { position: "top-right" });
            },
        });
    }

    const coverPreview = data.image ? URL.createObjectURL(data.image) : data.url || null;

    function restartCover() {
        setData("image", null);
        setData("url", '');
        setData("cover_type", '');
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-6xl h-[90vh] p-0 flex flex-col" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className="border-b p-6">
                    <DialogTitle>
                        Add a new anime
                    </DialogTitle>

                    <DialogDescription>
                        Complete the anime information.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1">
                        <div className="grid grid-cols-12 gap-8 p-6">
                            {/* Cover */}
                            <div className="col-span-3">
                                <div className="aspect-[2/3] overflow-hidden rounded-xl border bg-muted">
                                    {coverPreview ? (
                                        <img
                                            src={coverPreview}
                                            className="h-full w-full object-fill"
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
                                                        if (e.target.value) {
                                                            setData("cover_type", 'url');
                                                            setData("image", null);
                                                        }else{
                                                            setData("cover_type", '');
                                                        }
                                                    }}
                                                    />
                                                <Button type="button" className="rounded-l-none border-l" variant="ghost" onClick={() => restartCover()}>
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
                                                <Button type="button" className="rounded-l-none border-l" variant="ghost" onClick={() => restartCover()}>
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
                                                        if(file) {
                                                            setData("url", "");
                                                            setData("cover_type", 'upload');
                                                        }else{
                                                            setData("cover_type", '');
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    {errors.url && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.url}
                                        </p>
                                    )}
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.image}
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

                                    <div>
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
                                                <SelectItem value="Playing">
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
                                </div>

                                <Separator />
                                <div className="space-y-6 grid grid-cols-12 gap-4 items-end">

                                    {/* Rating */}

                                    <div className="col-span-6">
                                        <Label>Rating ({data.rating}/5)</Label>
                                        <Slider
                                            className="mt-4"
                                            min={0}
                                            max={5}
                                            step={1}
                                            value={[data.rating]}
                                            onValueChange={(value) =>setData("rating", value[0])}
                                        />

                                        {errors.rating && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.rating}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="col-span-12">
                                        <Label>Description</Label>
                                        <Textarea
                                            rows={5}
                                            value={data.description}
                                            onChange={(e) =>setData("description",e.target.value)}
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