import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageLinkItem, Filters } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from "react";
import AddGameModal from '@/components/games/add-game-modal';
import { Button } from "@/components/ui/button";
import GameList from '@/components/games/game-list';
import Pagination from '@/components/pagination';
import Search from '@/components/search';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Games',
        href: '/games',
    },
];

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

interface GamePaginated {
    data: Game[];
    links: PageLinkItem[];
}

interface Props {
    games: GamePaginated;
    gameGenres: GameGenre[];
    filters: Filters;
}

export default function Index({ games, gameGenres, filters }: Props) {
    
    const [open, setOpen] = useState(false);
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage,
        status: filters.status,
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Games" />
            <section className="flex h-full flex-col m-2">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <Search 
                        search={data.search}
                        setSearch={(value: string) => setData('search', value)} 
                        filters={filters} 
                        routeName="games.index" 
                        />
                    <div className="flex items-center justify-end">
                        <Button onClick={() => setOpen(true)} 
                            className="dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-500 dark:text-white"
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
