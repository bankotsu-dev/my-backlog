import { useForm } from "@inertiajs/react";
import { type Genre, Serie } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import MultiSelect from "@/components/games/multi-select";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    bookGenres: Genre[];
    serie: Serie;
}


export default function EditSerieModal({open,onOpenChange,bookGenres,serie}: Props) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        _method: "PUT",
        title: serie.title,
        original_title: serie.original_title || "",
        status: serie.status,
        author: serie.author || "",
        genres: serie.genres.map((genre) => genre.id),
    });

    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route("books-series.update", serie.id), {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                toast.success("The serie has been saved.", { position: "top-right" });
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
            <DialogContent className="max-w-5xl p-0 flex flex-col" onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader className="border-b p-6">
                    <DialogTitle>
                        {serie.title}
                    </DialogTitle>

                    <DialogDescription>
                        {serie.original_title}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} method="post" className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1">
                        <div className="grid grid-cols-12 gap-8 p-6">
                            {/* Form */}
                            <div className="col-span-12 space-y-6">
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

                                    <div className="col-span-1">
                                        <Label>Author</Label>
                                        <Input
                                            value={data.author}
                                            onChange={(e) => setData("author", e.target.value)}
                                        />

                                        {errors.author && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.author}
                                            </p>
                                        )}
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
                                                <SelectItem value="Reading">
                                                    Reading
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
                                            options={bookGenres}
                                            value={data.genres}
                                            onChange={(value) => setData("genres", value)}
                                            getValue={(genre) => genre.id}
                                            getLabel={(genre) => genre.genre}
                                        />
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