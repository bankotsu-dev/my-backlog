import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageLinkItem, Filters, Anime, Genre } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from "react";
import { Button } from '@/components/ui/button';
import AddAnimeModal from '@/components/animes/add-anime-modal';
import AnimeList from '@/components/animes/anime-list';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import StatusFilter from '@/components/status-filter';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Animes',
        href: route('animes.index'),
    },
];

interface AnimePaginated {
    data: Anime[];
    links: PageLinkItem[];
}

interface Props {
    animes: AnimePaginated;
    genres: Genre[];
    filters: Filters;
}

const items = [
    { label: "All", value: 'all' },
    { label: "Backlog", value: "Backlog" },
    { label: "Watching", value: "Watching" },
    { label: "Completed", value: "Completed" },
    { label: "Paused", value: "Paused" },
    { label: "Dropped", value: "Dropped" },
]

export default function Index({ animes, genres, filters }: Props) {
    
    const [open, setOpen] = useState(false);
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage,
        status: filters.status || '',
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Animes" />
            <AddAnimeModal
                open={open}
                onOpenChange={setOpen}
                genres={genres}
            />
            <section className="flex h-full flex-col m-2">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full">
                        <Search 
                            search={data.search}
                            setSearch={(value: string) => setData('search', value)} 
                            filters={filters} 
                            routeName="animes.index" 
                            />
                        <StatusFilter 
                            items={items} 
                            filters={filters} 
                            routeName="animes.index" 
                            status={data.status}
                            setStatus={(value: string) => setData('status', value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button onClick={() => setOpen(true)} 
                            className="dark:bg-violet-500 dark:hover:bg-violet-700 dark:focus:ring-violet-500 dark:text-white"
                            >
                            Add Anime
                        </Button>
                    </div>
                </div>
                <div className="flex h-full flex-1 flex-col rounded-xl space-y-4">
                    <AnimeList
                        animes={animes.data}
                    />
                    <Pagination
                        links={animes.links}
                        perPage={data.perPage}
                        setCurrentPage={(value: number) => setData('perPage', value)}
                        filters={filters} 
                        routeName="animes.index"
                    />
                </div>
            </section>
        </AppLayout>
    );
}
