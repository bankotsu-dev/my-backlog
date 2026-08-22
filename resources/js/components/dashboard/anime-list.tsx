import AnimeCard from "@/components/dashboard/anime-card";
import { type Anime } from "@/types";

interface Props {
    animes: Anime[];
}

export default function AnimeList({animes}: Props) {

    if (animes.length === 0) {
        return;
    }

    return (
        <section>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        Continue Watching
                    </h2>

                    <div className="mt-2 h-1 w-full rounded-full bg-violet-500" />
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {animes.map((anime) => (
                    <AnimeCard
                        key={anime.id}
                        anime={anime}
                    />
                ))}
            </div>
        </section>
    );
}