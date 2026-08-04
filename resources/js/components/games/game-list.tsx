import GameCard from "./game-card";

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
    games: Game[];
}

export default function GameList({ games }: Props) {
    return (
        <div className="space-y-5">
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    game={game}
                />
            ))}
        </div>
    );
}