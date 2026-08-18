import AnimeCard from "@/components/animes/anime-card";
import { type Anime } from '@/types';

interface Props {
    animes: Anime[];
}

export default function AnimeList({ animes }: Props) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {animes.map((anime) => (
                <AnimeCard
                    key={anime.id}
                    anime={anime}
                />
            ))}
        </div>
    );
}