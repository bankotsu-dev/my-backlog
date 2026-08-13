import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from '@inertiajs/react';
import { Star, Gamepad2 } from "lucide-react";

interface GameGenre {
    id: number;
    genre: string;
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
}

interface Props {
    game: Game;
}

export default function GameCard({ game }: Props) {

    return (
        <Card className="overflow-hidden p-0 border transition hover:border-violet-500">
            <Link href={route('games.show', game.id)}>
                <div className="flex">
                    <div className="flex aspect-[2/3] w-40 shrink-0 items-center justify-center bg-muted/40">
                        {game.cover ? (
                            <img
                                src={game.cover}
                                alt={game.title}
                                className="h-full w-full object-fill"
                            />
                        ) : (
                            <Gamepad2 className="h-20 w-20 text-muted-foreground" />
                        )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold line-clamp-2">
                                    {game.title}
                                </h2>

                                <p className="text-muted-foreground line-clamp-1">
                                    {game.original_title}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 line-clamp-1">
                            {game.genres.map((genre) => (
                                <Badge
                                    key={genre.id}
                                    className="bg-violet-500 text-white hover:bg-violet-500"
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
                                <Badge className="bg-violet-500 text-white hover:bg-violet-500">
                                    {game.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
}