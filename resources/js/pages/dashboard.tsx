import { Head } from '@inertiajs/react';
import { type BreadcrumbItem, Anime, Game, Serie } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AnimeList from '@/components/dashboard/anime-list';
import SerieList from '@/components/dashboard/serie-list';
import GameList from '@/components/dashboard/game-list';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    animes: Anime[];
    series: Serie[];
    games: Game[];
}

export default function Dashboard({ animes, series, games }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div> */}
                <div className="grid auto-rows-min gap-4">
                    {
                        animes.length > 0 && (
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 rounded-xl border md:min-h-min p-4">
                                <AnimeList animes={animes} />
                            </div>
                        )
                    }
                    {
                        series.length > 0 && (
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 rounded-xl border md:min-h-min p-4">
                                <SerieList series={series} />
                            </div>
                        )
                    }
                    {
                        games.length > 0 && (
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 rounded-xl border md:min-h-min p-4">
                                <GameList games={games} />
                            </div>
                        )
                    }
                </div>
            </div>
        </AppLayout>
    );
}
