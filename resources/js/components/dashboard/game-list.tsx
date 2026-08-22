import GameCard from "@/components/dashboard/game-card";
import { type Game } from "@/types";

interface Props {
    games: Game[];
}

export default function GameList({games}: Props) {

    if (games.length === 0) {
        return;
    }

    return (
        <section>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        Continue Playing
                    </h2>

                    <div className="mt-2 h-1 w-full rounded-full bg-violet-500" />
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                    />
                ))}
            </div>
        </section>
    );
}