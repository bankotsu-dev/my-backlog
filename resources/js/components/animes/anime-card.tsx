import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from '@inertiajs/react';
import { Star, MonitorPause } from "lucide-react";
import { type Anime } from '@/types';

interface Props {
    anime: Anime;
}

export default function AnimeCard({ anime }: Props) {

    return (
        <Card className="overflow-hidden p-0 border transition hover:border-violet-500">
            <Link href={route('animes.show', anime.id)}>
                <div className="flex">
                    <div className="flex aspect-[2/3] w-40 shrink-0 items-center justify-center bg-muted/40">
                        {anime.cover_url ? (
                            <img
                                src={anime.cover_url}
                                alt={anime.title}
                                className="h-full w-full object-fill"
                            />
                        ) : (
                            <MonitorPause className="h-20 w-20 text-muted-foreground" />
                        )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold line-clamp-2">
                                    {anime.title}
                                </h2>

                                <p className="text-muted-foreground line-clamp-1">
                                    {anime.original_title}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 line-clamp-1">
                            {anime.genres?.map((genre) => (
                                <Badge
                                    key={genre.id}
                                    className="bg-violet-500 text-white hover:bg-violet-500"
                                >
                                    {genre.genre}
                                </Badge>
                            ))}
                        </div>

                        <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                            {anime.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-6">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`h-5 w-5 ${
                                            index < (anime.rating ?? 0)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted"
                                        }`}
                                    />
                                ))}
                            </div>

                            <div className="text-sm text-muted-foreground">
                                <Badge className="bg-violet-500 text-white hover:bg-violet-500">
                                    {anime.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
}