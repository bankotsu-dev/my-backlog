import { Link } from "@inertiajs/react";
import { type Game } from "@/types";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function GameCard({ game }: { game: Game }) {
    return (
        <div key={game.id}>
            <Link href={route('games.show', game.id)}>
                <Card
                    className="overflow-hidden border-0 bg-transparent shadow-none group hover:cursor-pointer"
                >
                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                        {game.cover ? (
                            <img
                                src={game.cover}
                                alt={game.title}
                                className="h-full w-full object-fill transition duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <h3 className="text-xl font-bold">{game.title}</h3>
                            </div>
                        )}
                        <div className="absolute right-2 bottom-2 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                            {game.status}
                        </div>
                    </div>

                    <div className="mt-3">
                        <h3 className="line-clamp-2 font-semibold transition group-hover:text-violet-400">
                            {game.title}
                        </h3>

                        {game.original_title && (
                            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                                {game.original_title}
                            </p>
                        )}

                        {/* Rating */}
                        {game.rating != null && game.rating != 0 && (
                            <div className="mt-2 flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`h-4 w-4 ${
                                            index < game.rating!
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-muted'
                                        }`}
                                    />
                                ))}

                                <span className="ml-1 text-xs text-muted-foreground">
                                    {game.rating}
                                </span>
                            </div>
                        )}
                    </div>
                </Card>
            </Link>
        </div>
    );
}