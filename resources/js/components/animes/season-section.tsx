import SeasonCard from "@/components/animes/season-card";
import { Season } from "@/types";

interface Props {
    title: string;
    seasons: Season[];
}

export default function SeasonSection({title,seasons}: Props) {

    if (seasons.length === 0) {
        return null;
    }

    return (
        <section>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>

                    <div className="mt-2 h-1 w-full rounded-full bg-violet-500" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {seasons.map((season) => (
                    <SeasonCard
                        key={season.id}
                        season={season}
                    />
                ))}
            </div>
        </section>
    );
}