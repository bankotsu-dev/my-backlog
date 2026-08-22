import AnimeCard from "@/components/dashboard/anime-card";
import { type Anime } from "@/types";

interface Props {
    animes: Anime[];
}

export default function AnimeList({animes}: Props) {

    if (animes.length === 0) {
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
                <div className="flex items-center">
                    <h3 className="text-2xl text-muted-foreground">
                        You're not watching anything yet
                    </h3>
                </div>
            </section>
        );
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

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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