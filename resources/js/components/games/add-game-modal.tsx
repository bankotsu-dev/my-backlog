import { FormEvent } from "react";
import { useForm } from "@inertiajs/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddGameModal({
    open,
    onOpenChange,
}: Props) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        title: "",
        status: "Backlog",
        description: "",
        notes: "",
        cover: "",
        background_image: "",
        developer: "",
        publisher: "",
        rating: 5,
        hltb: "",
        version: "",
    });

    function submit(e: FormEvent) {
        e.preventDefault();

        post(route("games.store"), {
            preserveScroll: true,

            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
        });
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-6xl overflow-hidden p-0">
                <DialogHeader className="border-b p-6">
                    <DialogTitle>
                        Add a new game
                    </DialogTitle>

                    <DialogDescription>
                        Complete the game information.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit}>
                    <ScrollArea className="max-h-[75vh]">
                        <div className="grid grid-cols-12 gap-8 p-6">
                            {/* Cover */}
                            <div className="col-span-3">
                                <div className="aspect-[2/3] overflow-hidden rounded-xl border bg-muted">
                                    {data.cover ? (
                                        <img
                                            src={data.cover}
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
                                        value={data.cover}
                                        onChange={(e) => setData("cover", e.target.value)}
                                    />

                                    {errors.cover && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.cover}
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
                                            value={data.background_image}
                                            onChange={(e) => setData("background_image", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Separator />
                                <div className="space-y-6">

                                {/* Rating */}

                                <div>
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
                                <div>
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
                                    <div>
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
                            onClick={() => onOpenChange(false)}
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