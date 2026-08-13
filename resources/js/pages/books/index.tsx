import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageLinkItem, Filters } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import Search from '@/components/search';
import StatusFilter from '@/components/status-filter';
import AddSerieModal from '@/components/books/add-serie-modal';
import Pagination from '@/components/pagination';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '#',
    },
];

interface BookGenre {
    id: number;
    genre: string;
}

interface Serie {
    id: number;
    title: string;
    original_title: string;
    author: string;
    status: string;
    genres: BookGenre[];
}

interface SeriePaginated {
    data: Serie[];
    links: PageLinkItem[];
}

interface Props {
    series: SeriePaginated;
    bookGenres: BookGenre[];
    filters: Filters;
}

const items = [
    { label: "All", value: 'all' },
    { label: "Backlog", value: "Backlog" },
    { label: "Reading", value: "Reading" },
    { label: "Completed", value: "Completed" },
    { label: "Paused", value: "Paused" },
    { label: "Dropped", value: "Dropped" },
]

export default function Index({series, bookGenres, filters}: Props) {
    
    const [open, setOpen] = useState(false);
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage,
        status: filters.status || '',
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />
            <section className="flex h-full flex-col m-2">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full">
                        <Search 
                            search={data.search}
                            setSearch={(value: string) => setData('search', value)} 
                            filters={filters} 
                            routeName="books.index" 
                            />
                        <StatusFilter 
                            items={items} 
                            filters={filters} 
                            routeName="books.index" 
                            status={data.status}
                            setStatus={(value: string) => setData('status', value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button onClick={() => setOpen(true)} 
                            className="dark:bg-violet-500 dark:hover:bg-violet-700 dark:focus:ring-violet-500 dark:text-white"
                            >
                            Add Serie
                        </Button>
                    </div>
                    <AddSerieModal
                        open={open}
                        onOpenChange={setOpen}
                        gameGenres={bookGenres}
                    />
                </div>
                <div className="flex h-full flex-1 flex-col rounded-xl space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="">Title</TableHead>
                            <TableHead className="text-center">Genres</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {series.data.map((serie) => (
                            <TableRow 
                                key={serie.id} 
                                className="hover:bg-violet-500/30 cursor-pointer"
                                onClick={() => router.visit(route('books.show', serie.id))}
                            >
                                <TableCell className="">
                                    <p>{serie.title}</p>
                                    <p className="text-sm text-muted-foreground">{serie.original_title}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                    {serie.genres.map((genre) => (
                                        <Badge
                                            key={genre.id}
                                            className="bg-violet-500 text-white hover:bg-violet-500 mx-0.5"
                                        >
                                            {genre.genre}
                                        </Badge>
                                    ))}
                                </TableCell>
                                <TableCell>{serie.author}</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="bg-violet-500 text-white hover:bg-violet-500">
                                        {serie.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        links={series.links}
                        perPage={data.perPage}
                        setCurrentPage={(value: number) => setData('perPage', value)}
                        filters={filters} 
                        routeName="books.index"
                    />
                </div>
            </section>
        </AppLayout>
    )
    
}