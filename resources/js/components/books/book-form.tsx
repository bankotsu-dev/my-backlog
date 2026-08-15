import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Book {
    id: number;
    serie_id: number;
    title: string;
    original_title: string;
    status: string;
    last_page: number;
    type: string;
    order: number;
    cover_type: string;
    cover_url: string;
    cover_path: string;
    rating: number;
    notes: string;
}

interface Props {
    book: Book
    closeEditing: () => void
}

interface BookForm {
    [key: string]: string | number | null | File;
    title: string;
    original_title: string;
    status: string;
    last_page: number;
    type: string;
    order: number;
    img_type: string;
    url: string;
    image: File | null;
    rating: number;
    notes: string;
}

export default function ShowEditBookModal({ book, closeEditing }: Props) {

    const {
            data,
            setData,
            post,
            processing,
            errors,
            reset,
        } = useForm<BookForm>({
            _method: "PUT",
            title: book.title,
            original_title: book.original_title || "",
            status: book.status,
            last_page: book.last_page || 0,
            type: book.type,
            order: book.order,
            img_type: "url",
            url: book.cover_url || "",
            image: null as File | null,
            rating: book.rating || 0,
            notes: book.notes || "",
        });

    const coverPreview = data.image ? URL.createObjectURL(data.image) : data.url || null;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route("books.update", book.id), {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                toast.success("The book has been saved.", { position: "top-right" });
                reset();
                closeEditing();
            },

            onError: (errors) => {
                toast.error(errors.error, { position: "top-right" });
            },
        });
    }    

    function resetCover() {
        setData("image", null);
        setData("url", '');
        setData("img_type", 'url');
    }

    return (
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
                                    <BookOpen className="h-20 w-20 text-muted-foreground/40"/>
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
                                            {data.cover_img instanceof File
                                                ? data.cover_img.name
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
                            
                            <div className="col-span-1">
                                <Label>Type</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value) =>setData("type",value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="main">
                                            Main
                                        </SelectItem>
                                        <SelectItem value="prequel">
                                            Prequel
                                        </SelectItem>
                                        <SelectItem value="sequel">
                                            Sequel
                                        </SelectItem>
                                        <SelectItem value="spin-off">
                                            Spin-off
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-1">
                                <Label>Order</Label>
                                <Input
                                    type="number"
                                    step="1"
                                    min="1"
                                    value={data.order}
                                    onChange={(e) => setData("order", parseInt(e.target.value))}
                                />

                                {errors.order && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.order}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label>Last Page Read</Label>
                                <Input
                                    type="number"
                                    step="1"
                                    value={data.last_page}
                                    onChange={(e) => setData("last_page", parseInt(e.target.value))}
                                />

                                {errors.last_page && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.last_page}
                                    </p>
                                )}
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

            <div className="border-t p-6 flex justify-end gap-2">
                <Button
                    className="hover:bg-neutral-700 text-white bg-neutral-500 hover:text-white"
                    type="button"
                    variant="outline"
                    onClick={() => {
                        reset();
                        closeEditing();
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
            </div>
        </form>
    );
}