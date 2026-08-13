import { useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    gameId: number;
}

export default function AddGameModal({
    open,
    onOpenChange,
    gameId,
}: Props) {
    

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        'game_id': gameId,
        'source': '',
        'url': '',
        'image': null as File | null,
    });

    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route("game-images.store"), {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                toast.success("Image has been saved.", { position: "top-right" });
                reset();
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
            <DialogContent className="max-w-4xl p-0 flex flex-col" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className="border-b p-6">
                    <DialogTitle>
                        Add a new image
                    </DialogTitle>

                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden p-6">
                    <div className="col-span-2">
                        <Label>New Image</Label>
                        <Tabs defaultValue="URL">
                            <TabsList>
                                <TabsTrigger value="URL">URL</TabsTrigger>
                                <TabsTrigger value="Upload">Upload</TabsTrigger>
                            </TabsList>
                            <TabsContent value="URL">
                                <Input
                                    placeholder="https://..."
                                    value={data.url}
                                    onChange={(e) => {
                                        setData("url", e.target.value);
                                        setData("source", 'url');
                                        if (e.target.value) {
                                            setData("image", null);
                                        }
                                    }}
                                />
                            </TabsContent>
                            <TabsContent value="Upload">
                                <Button 
                                    type="button"
                                    asChild 
                                    size="sm"
                                    className="bg-violet-500 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-700 dark:text-white rounded-r-none p-1"
                                >
                                    <label htmlFor="upload-image">
                                        Select image
                                    </label>
                                </Button>
                                <span className="text-sm text-muted-foreground truncate pl-2 pr-2">
                                    {data.image instanceof File
                                        ? data.image.name
                                        : "No file selected"}
                                </span>
                                <Input
                                    id="upload-image"
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setData("image", file ?? null);
                                        if (file) {
                                            setData("source", 'upload');
                                            setData("url", "");
                                        }
                                    }}
                                />
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
                            Close
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