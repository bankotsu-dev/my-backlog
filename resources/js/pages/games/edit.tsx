import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import MultiSelect from "@/components/games/multi-select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Games',
        href: '/games',
    },
    {
        title: 'Edit game',
        href: '#',
    },
];

interface GameGenre {
    id: number;
    genre: string;
}

interface Game {
    id: number;
    title: string;
    status: string;
    description: string | null;
    notes: string | null;
    cover: string | null;
    background_image: string | null;
    developer: string | null;
    publisher: string | null;
    rating: number;
    hg: boolean;
    version: string | null;
    genres: GameGenre[];
}

interface Props {
    game: Game;
    gameGenres: GameGenre[];
}

export default function Edit( { game, gameGenres } : Props) {

    const { data, setData, post, processing, errors, transform } = useForm({
        _method: "PUT",
        title: game.title,
        status: game.status,
        description: game.description ?? '',
        genres: game.genres.map((genre) => genre.id),
        notes: game.notes ?? '',
        cover_img: null as File | null,
        cover_url: game.cover ?? '',
        background_img: null as File | null,
        background_url: game.background_image ?? '',
        developer: game.developer ?? '',
        publisher: game.publisher ?? '',
        rating: game.rating,
        hg: game.hg,
        version: game.version ?? '',
        updateCoverURL: false as boolean,
        updateBackgroundURL: false as boolean,
    });

    const coverPreview = data.cover_img ? URL.createObjectURL(data.cover_img) : data.cover_url || null;
    const backgroundPreview = data.background_img ? URL.createObjectURL(data.background_img) : data.background_url || null;

    function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        transform((data) => ({
            ...data,
            ...(data.cover_url === game.cover && {
                cover_url: undefined,
                updateCoverURL: false,
            }),
            ...(data.background_url === game.background_image && {
                background_url: undefined,
                updateBackgroundURL: false,
            }),
        }));

        post(route("games.update", game.id), {
            forceFormData: true,
            onError: (errors) => {
                toast.error(errors.error, { position: "top-right" });
            },
        });
    }

    function restartCover() {
        setData("cover_img", null);
        setData("cover_url", game.cover ?? '');
    }

    function restartBackground() {
        setData("background_img", null);
        setData("background_url", game.background_image ?? '');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit game" />
            {/* Background */}
            <form onSubmit={handleUpdate} method="post" className="flex-1 flex flex-col overflow-hidden relative isolate">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    {backgroundPreview && (
                        <>
                            <img
                                src={backgroundPreview}
                                className="h-full w-full object-fill"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </>
                    )}
                </div>
                <div className="grid grid-cols-12 gap-8 p-6">
                    {/* Cover */}
                    <div className="col-span-3">
                        <div className="aspect-[2/3] overflow-hidden rounded-xl border bg-muted">
                            {coverPreview && (
                                <img
                                    src={coverPreview}
                                    className="h-full w-full object-fill"
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <Label className="bg-white p-2 rounded-md dark:bg-black">Cover</Label>
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
                                                setData("updateCoverURL", true);
                                                if (e.target.value) {
                                                    setData("cover_img", null);
                                                }
                                            }}
                                        />
                                        <Button type="button" className="rounded-l-none border-l dark:bg-black dark:text-white dark:hover:bg-neutral-900" 
                                            onClick={() => restartCover()}
                                        >
                                            <RotateCcw />
                                        </Button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="Upload">
                                    <div className="flex items-center gap-0">
                                        <Button type="button" asChild 
                                            className="bg-violet-500 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-700 dark:text-white rounded-r-none p-1"
                                        >
                                            <label htmlFor="cover-img">
                                                Select image
                                            </label>
                                        </Button>
                                        <span className="text-neutral-300 truncate pl-2 pr-2 dark:bg-black h-10 text-center flex-1 flex items-center">
                                            {data.cover_img instanceof File
                                                ? data.cover_img.name
                                                : "No file selected"}
                                        </span>
                                        <Input
                                            id="cover-img"
                                            className="hidden"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                setData("cover_img", file ?? null);
                                                if (file) {
                                                    setData("cover_url", "");
                                                }
                                            }}
                                        />
                                        <Button type="button" className="rounded-l-none border-l dark:bg-black dark:text-white dark:hover:bg-neutral-900" 
                                            onClick={() => restartCover()}
                                        >
                                            <RotateCcw />
                                        </Button>
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
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Title</Label>
                                <Input
                                    required
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
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Status</Label>
                                <Select
                                    required
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
                                {errors.status && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Version</Label>
                                <Input
                                    value={data.version}
                                    onChange={(e) => setData("version", e.target.value)}
                                />
                                {errors.version && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.version}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Developer</Label>
                                <Input
                                    value={data.developer}
                                    onChange={(e) => setData("developer", e.target.value)}
                                />
                                {errors.developer && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.developer}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Publisher</Label>
                                <Input
                                    value={data.publisher}
                                    onChange={(e) => setData("publisher", e.target.value)}
                                />
                                {errors.publisher && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.publisher}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Background Image</Label>
                                <Tabs defaultValue="URL">
                                    <TabsList>
                                        <TabsTrigger value="URL">URL</TabsTrigger>
                                        <TabsTrigger value="Upload">Upload</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="URL">
                                        <div className="flex items-center gap-0">
                                            <Input
                                                placeholder="https://..."
                                                value={data.background_url}
                                                onChange={(e) => {
                                                    setData("background_url", e.target.value);
                                                    setData("updateBackgroundURL", true);
                                                    if (e.target.value) {
                                                        setData("background_img", null);
                                                    }
                                                }}
                                            />
                                            <Button type="button" className="rounded-l-none border-l dark:bg-black dark:text-white dark:hover:bg-neutral-900" 
                                                onClick={() => restartBackground()}
                                            >
                                                <RotateCcw />
                                            </Button>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="Upload">
                                        <div className="flex items-center gap-0">
                                            <Button type="button" asChild
                                                className="bg-violet-500 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-700 dark:text-white rounded-r-none p-1"
                                            >
                                                <label htmlFor="background-img">
                                                    Select image
                                                </label>
                                            </Button>
                                            <span className="text-neutral-300 truncate pl-2 pr-2 dark:bg-black h-10 text-center flex-1 flex items-center">
                                                {data.background_img instanceof File
                                                    ? data.background_img.name
                                                    : "No file selected"}
                                            </span>
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
                                            <Button  type="button" className="rounded-l-none border-l dark:bg-black dark:text-white dark:hover:bg-neutral-900"
                                                onClick={() => restartBackground()}
                                            >
                                                <RotateCcw />
                                            </Button>
                                        </div>
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
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Genres</Label>
                                <MultiSelect
                                    options={gameGenres}
                                    value={data.genres}
                                    onChange={(value) => setData("genres", value)}
                                    getValue={(genre) => genre.id}
                                    getLabel={(genre) => genre.genre}
                                />
                            </div>
                            {errors.genres && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.genres}
                                </p>
                            )}
                        </div>

                        <Separator />
                        <div className="space-y-6 grid grid-cols-12 gap-4 items-end">

                            {/* Rating */}

                            <div className="col-span-6">
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Rating ({data.rating}/5)</Label>
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
                                <Label className="bg-white p-2 rounded-md dark:bg-black">HG</Label>
                                <Switch
                                    checked={data.hg}
                                    onCheckedChange={(checked) =>setData("hg", checked)}
                                />
                                {errors.hg && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.hg}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="col-span-12">
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Description</Label>
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
                                <Label className="bg-white p-2 rounded-md dark:bg-black">Notes</Label>
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
                        <div className="flex items-center justify-end gap-2">
                            <Link href={route("games.index")}>
                                <Button type="button" disabled={processing}>
                                    Cancel
                                </Button>
                            </Link>
                            
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}