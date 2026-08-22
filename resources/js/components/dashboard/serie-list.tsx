import SerieCard from "@/components/dashboard/serie-card";
import { type Serie } from "@/types";

interface Props {
    series: Serie[];
}

export default function SerieList({series}: Props) {

    if (series.length === 0) {
        return;
    }

    return (
        <section>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        Continue Reading
                    </h2>

                    <div className="mt-2 h-1 w-full rounded-full bg-violet-500" />
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {series.map((serie) => (
                    <SerieCard
                        key={serie.id}
                        serie={serie}
                    />
                ))}
            </div>
        </section>
    );
}