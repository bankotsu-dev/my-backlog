import SerieCard from "@/components/dashboard/serie-card";
import { type Serie } from "@/types";

interface Props {
    series: Serie[];
}

export default function SerieList({series}: Props) {

    if (series.length === 0) {
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
                <div className="flex items-center">
                    <h3 className="text-2xl text-muted-foreground">
                        You're not reading anything yet
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
                        Continue Reading
                    </h2>

                    <div className="mt-2 h-1 w-full rounded-full bg-violet-500" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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