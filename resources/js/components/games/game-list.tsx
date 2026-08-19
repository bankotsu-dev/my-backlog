import { Game } from "@/types";
import GameCard from "@/components/games/game-card";

interface Props {
    games: Game[];
}

export default function GameList({ games }: Props) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    game={game}
                />
            ))}
        </div>
    );
}