import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useForm } from '@inertiajs/react';
import { Edit, Eye, Star, Trash2, Gamepad2 } from "lucide-react";

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
}

export default function GameCard({ game }: Props) {

    const {processing, delete: destroy} = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this game?')) {
            destroy(route('games.destroy', id));
        }
    };

    return (
        <Card className="overflow-hidden p-0 transition hover:shadow-lg">
            <div className="flex">
                <div className="flex aspect-[2/3] w-40 shrink-0 items-center justify-center bg-muted/40">
                    {game.cover ? (
                        <img
                            src={game.cover}
                            alt={game.title}
                            className="aspect-[2/3] h-full w-full object-fill"
                        />
                    ) : (
                        <Gamepad2 className="h-20 w-20 text-muted-foreground" />
                    )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {game.title}
                            </h2>

                            <p className="text-muted-foreground">
                                {game.developer}
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-2">
                                <Link href={route('games.show', game.id)}>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        title="View details"
                                        className="hover:text-sky-400"
                                        >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    title="Edit"
                                    className="hover:text-amber-400"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="hover:text-destructive"
                                    title="Delete"
                                    onClick={() => handleDelete(game.id)}
                                    disabled={processing}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <Badge className="bg-purple-500 text-white hover:bg-purple-600">
                                {game.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {game.genres.map((genre) => (
                            <Badge
                                key={genre.id}
                                variant="secondary"
                            >
                                {genre.genre}
                            </Badge>
                        ))}
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                        {game.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    className={`h-5 w-5 ${
                                        index < game.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {game.publisher}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}