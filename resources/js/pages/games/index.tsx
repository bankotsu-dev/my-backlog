import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageLinkItem, Filters, Genre, Game } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from "react";
import AddGameModal from '@/components/games/add-game-modal';
import { Button } from "@/components/ui/button";
import GameList from '@/components/games/game-list';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import StatusFilter from '@/components/status-filter';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Games',
        href: '/games',
    },
];

interface GamePaginated {
    data: Game[];
    links: PageLinkItem[];
}

interface Props {
    games: GamePaginated;
    gameGenres: Genre[];
    filters: Filters;
}

const items = [
    { label: "All", value: 'all' },
    { label: "Backlog", value: "Backlog" },
    { label: "Playing", value: "Playing" },
    { label: "Completed", value: "Completed" },
    { label: "Paused", value: "Paused" },
    { label: "Dropped", value: "Dropped" },
]

export default function Index({ games, gameGenres, filters }: Props) {
    
    const [open, setOpen] = useState(false);
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage,
        status: filters.status || '',
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Games" />
            <section className="flex h-full flex-col m-2">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full">
                        <Search 
                            search={data.search}
                            setSearch={(value: string) => setData('search', value)} 
                            filters={filters} 
                            routeName="games.index" 
                            />
                        <StatusFilter 
                            items={items} 
                            filters={filters} 
                            routeName="games.index" 
                            status={data.status}
                            setStatus={(value: string) => setData('status', value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button onClick={() => setOpen(true)} 
                            className="dark:bg-violet-500 dark:hover:bg-violet-700 dark:focus:ring-violet-500 dark:text-white"
                            >
                            Add Game
                        </Button>
                    </div>
                    <AddGameModal
                        open={open}
                        onOpenChange={setOpen}
                        gameGenres={gameGenres}
                    />
                </div>
                <div className="flex h-full flex-1 flex-col rounded-xl space-y-4">
                    <GameList
                        games={games.data}
                        />
                    <Pagination
                        links={games.links}
                        perPage={data.perPage}
                        setCurrentPage={(value: number) => setData('perPage', value)}
                        filters={filters} 
                        routeName="games.index"
                        />
                </div>
            </section>
        </AppLayout>
    );
}
