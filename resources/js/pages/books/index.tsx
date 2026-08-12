import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageLinkItem, Filters } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import Search from '@/components/search';
import StatusFilter from '@/components/status-filter';
import AddSerieModal from '@/components/books/add-serie-modal';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '#',
    },
];

interface Serie {
    id: number;
    title: string;
    orginal_title: string;
    author: string;
    status: string;
}

interface SeriePaginated {
    data: Serie[];
    links: PageLinkItem[];
}
interface BookGenre {
    id: number;
    genre: string;
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
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {series.data.map((serie) => (
                            <TableRow key={serie.id}>
                                <TableCell className="">{serie.title}</TableCell>
                                <TableCell>{serie.author}</TableCell>
                                <TableCell>{serie.status}</TableCell>
                                <TableCell className="text-right">Show | Edit | Delete</TableCell>
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