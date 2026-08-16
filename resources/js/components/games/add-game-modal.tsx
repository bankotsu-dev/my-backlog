import { useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { usePage } from "@inertiajs/react";
import type { Auth } from "@/types";
import MultiSelect from "@/components/games/multi-select";
import { Gamepad2, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";

interface GameGenre {
    id: number;
    genre: string;
}
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    gameGenres: GameGenre[];
}

interface GameForm {
    [key: string]: string | number | boolean | File | null | number[];
    user_id: number;
    title: string;
    original_title: string;
    status: string;
    description: string;
    genres: number[];
    notes: string;
    cover_img: File | null;
    cover_url: string;
    background_img: File | null;
    background_url: string;
    developer: string;
    publisher: string;
    rating: number;
    hg: boolean;
    version: string;
}

export default function AddGameModal({
    open,
    onOpenChange,
    gameGenres,
}: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<GameForm>({
        user_id: auth.user.id,
        title: "",
        original_title: "",
        status: "Backlog",
        description: "",
        genres: [] as number[],
        notes: "",
        cover_img: null as File | null,
        cover_url: "",
        background_img: null as File | null,
        background_url: "",
        developer: "",
        publisher: "",
        rating: 0,
        hg: false,
        version: "",
    });

    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route("games.store"), {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                toast.success("Game has been saved.", { position: "top-right" });
                reset();
                onOpenChange(false);
            },

            onError: (errors) => {
                toast.error(errors.error, { position: "top-right" });
            },
        });
    }

    const coverPreview = data.cover_img ? URL.createObjectURL(data.cover_img) : data.cover_url || null;

    function restartBackground() {
        setData("background_img", null);
        setData("background_url", '');
    }

    function restartCover() {
        setData("cover_img", null);
        setData("cover_url", '');
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-6xl h-[90vh] p-0 flex flex-col" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className="border-b p-6">
                    <DialogTitle>
                        Add a new game
                    </DialogTitle>

                    <DialogDescription>
                        Complete the game information.
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
                                            <Gamepad2 className="h-20 w-20 text-muted-foreground/40"/>
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
                                                    value={data.cover_url}
                                                    onChange={(e) => {
                                                        setData("cover_url", e.target.value);
                                                        if (e.target.value) {
                                                            setData("cover_img", null);
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
                                                    {data.cover_img instanceof File
                                                        ? data.cover_img.name
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
                                                        setData("cover_img", file ?? null);
                                                        if (file) setData("cover_url", "");
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    {errors.cover_img && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.cover_img}
                                        </p>
                                    )}
                                    {errors.cover_url && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.cover_url}
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
                                                    Playing
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

                                    <div>
                                        <Label>Version</Label>
                                        <Input
                                            value={data.version}
                                            onChange={(e) => setData("version", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>Developer</Label>
                                        <Input
                                            value={data.developer}
                                            onChange={(e) => setData("developer", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>Publisher</Label>
                                        <Input
                                            value={data.publisher}
                                            onChange={(e) => setData("publisher", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label>Background Image</Label>
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
                                                        value={data.background_url}
                                                        onChange={(e) => {
                                                            setData("background_url", e.target.value);
                                                            if (e.target.value) {
                                                                setData("background_img", null);
                                                            }
                                                        }}
                                                        />
                                                    <Button type="button" className="rounded-l-none border-l" variant="ghost" onClick={() => restartBackground()}>
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
                                                        <label htmlFor="background-img">
                                                            Select image
                                                        </label>
                                                    </Button>
                                                    <span className="text-neutral-400 text-sm truncate pl-2 pr-2 h-10 text-center flex-1 flex items-center">
                                                        {data.background_img instanceof File
                                                            ? data.background_img.name
                                                            : "No file selected"}
                                                    </span>
                                                    <Button type="button" className="rounded-l-none border-l" variant="ghost" onClick={() => restartBackground()}>
                                                        <RotateCcw />
                                                    </Button>
                                                </div>
                                                <Input
                                                    id="background-img"
                                                    className="hidden"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        setData("background_img", file ?? null);
                                                        if (file) setData("background_url", "");
                                                    }}
                                                />
                                            </TabsContent>
                                        </Tabs>

                                        {errors.background_url && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.background_url}
                                            </p>
                                        )}
                                        {errors.background_img && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.background_img}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2">
                                        <Label>Genres</Label>
                                        <MultiSelect
                                            options={gameGenres}
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

                                    {/* HG */}
                                    <div className="col-span-6 flex items-center justify-self-center space-x-2">
                                        <Label>HG</Label>
                                        <Switch
                                            checked={data.hg}
                                            onCheckedChange={(checked) =>setData("hg", checked)}
                                        />
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

                                    {/* Notes */}
                                    <div className="col-span-12">
                                        <Label>Notes</Label>
                                        <Textarea
                                            rows={4}
                                            value={data.notes}
                                            onChange={(e) => setData("notes",e.target.value)}
                                        />

                                        {errors.notes && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.notes}
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
                                : "Add Game"}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}