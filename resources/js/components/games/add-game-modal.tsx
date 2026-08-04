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
    status: string;
    description: string;
    genres: number[];
    notes: string;
    cover_img: File | null;
    background_img: File | null;
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
        status: "Backlog",
        description: "",
        genres: [] as number[],
        notes: "",
        cover_img: null as File | null,
        background_img: null as File | null,
        developer: "",
        publisher: "",
        rating: 0,
        hg: false,
        version: "",
    });

    function submit(e:React.FormEvent<HTMLFormElement>) {
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

                <form onSubmit={submit} className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1">
                        <div className="grid grid-cols-12 gap-8 p-6">
                            {/* Cover */}
                            <div className="col-span-3">
                                <div className="aspect-[2/3] overflow-hidden rounded-xl border bg-muted">
                                    {data.cover_img ? (
                                        <img
                                            src={data.cover_img ? URL.createObjectURL(data.cover_img) : ""}
                                            className="h-full w-full object-cover"
                                        />
                                        ) : (
                                        <div className="flex h-full items-center justify-center text-muted-foreground">
                                            ...
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <Label>Cover URL</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                           const file = e.target.files?.[0];
                                           if (file) setData("cover_img", file); 
                                        }}
                                    />

                                    {errors.cover_img && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.cover_img}
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
                                            value={data.title}
                                            onChange={(e) => setData("title", e.target.value)}
                                        />

                                        {errors.title && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.title}
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
                                        <Label>Background URL</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                           const file = e.target.files?.[0];
                                           if (file) setData("background_img", file); 
                                        }}
                                        />
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