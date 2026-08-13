import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, Gamepad2, Star, Trash2 } from "lucide-react";
import { type BreadcrumbItem } from '@/types';
import GameGallery from '@/components/games/game-gallery';

interface GameGenre {
    id: number;
    genre: string;
}

interface Image {
    id: number;
    game_id: number;
    source: string;
    url: string;
    path: string;
}

interface Game {
    id: number;
    title: string;
    original_title: string;
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
    images: Image[];
}

interface Props {
    game: Game;
}

export default function GameShow({
    game,
}: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Games',
            href: route('games.index'),
        },
        {
            title: game.title,
            href: '#',
        },
    ];
    const heroImage = game.background_image ?? '';

    const {processing, delete: destroy} = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this game?')) {
            destroy(route('games.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={game.title} />
            <section className="relative isolate overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    {heroImage && (
                        <>
                            <img
                                src={heroImage}
                                className="h-full w-full object-fill"
                                />
                            <div className="absolute inset-0 bg-black/10" />
                        </>
                    )}
                </div>
                <div className="mx-auto flex min-h-screen flex-col px-6 py-12">
                    {/* HERO */}
                    <div className="mt-auto flex items-start gap-10">
                        {/* Cover */}
                        <div className="w-60 shrink-0">
                            {game.cover ? (
                                <img
                                    src={game.cover}
                                    alt={game.title}
                                    className="aspect-[2/3] rounded-xl object-fill shadow-2xl"
                                />
                            ) : (
                                <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-muted shadow-2xl">
                                    <Gamepad2 className="h-20 w-20 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                        {/* Información */}
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold text-violet-700 [text-shadow:0_0_4px_white,0_0_6px_white]">
                                {game.title}
                            </h1>
                            <h2 className="mt-2 text-3xl font-bold text-violet-700 [text-shadow:0_0_2px_white,0_0_4px_white]">
                                {game.original_title}
                            </h2>
                            
                            <div className="mt-5 flex flex-wrap gap-2">
                                {game.genres.map((genre) => (
                                    <Badge
                                        key={genre.id}
                                        className="bg-violet-500 text-white hover:bg-violet-500"
                                    >
                                        {genre.genre}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mt-6 flex items-center gap-6">
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Star
                                        className="h-5 w-5 fill-current"
                                    />
                                    <span className="text-lg font-semibold">
                                        {game.rating}/5
                                    </span>
                                </div>
                                <Badge className="bg-violet-500 text-white hover:bg-violet-500">
                                    {game.status}
                                </Badge>
                            </div>
                            <div className="mt-8 flex gap-3">
                                <Link href={route('games.edit', game.id)}>
                                    <Button className="hover:bg-violet-700 text-white bg-violet-500">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    variant="destructive"
                                    onClick={() => handleDelete(game.id)}
                                    disabled={processing}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* CARDS */}
                    <div className="mt-8 grid grid-cols-12 gap-8 pb-4">
                        {/* DETAILS */}
                        <Card className="col-span-12 lg:col-span-3 h-fit bg-black/50 backdrop-blur-xs text-violet-400">
                            <CardHeader>
                                <CardTitle className="text-white">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div>
                                    <p className="text-sm text-white">Status</p>
                                    <p>{game.status}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-white">Developer</p>
                                    <p>{game.developer || "-"}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-white">Publisher</p>
                                    <p>{game.publisher || "-"}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-white">Version</p>
                                    <p>{game.version || "-"}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-white">Genres</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {game.genres.map((genre) => (
                                            <Badge
                                                key={genre.id}
                                                className="bg-violet-500 text-white hover:bg-violet-500"
                                            >
                                                {genre.genre}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-white">Rating</p>
                                    <p className="flex items-center gap-1">
                                        {game.rating}/5
                                        <Star className="h-5 w-5 fill-current" />
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-white">HG</p>
                                    <p>{game.hg ? "Yes" : "No"}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* RIGHT COLUMN */}
                        <div className="col-span-12 lg:col-span-9 space-y-6">
                            {/* DESCRIPTION */}
                            {game.description && (
                                <Card className="bg-black/50 backdrop-blur-xs text-white">
                                    <CardHeader>
                                        <CardTitle>Description</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-line leading-8">
                                            {game.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* NOTES */}
                            {game.notes && (
                                <Card className="bg-black/50 backdrop-blur-xs text-white">
                                    <CardHeader>
                                        <CardTitle>Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-line leading-8">
                                            {game.notes}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* GALLERY */}
                            <GameGallery images={game.images} gameId={game.id} />
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}