import { useState } from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit, Plus, Star, Trash2 } from 'lucide-react';
import BookSection from '@/components/books/book-section';
import AddBookModal from "@/components/books/add-book-modal";

interface BookGenre {
    id: number;
    genre: string;
}

interface Book {
    id: number;
    serie_id: number;
    title: string;
    original_title: string;
    status: string;
    last_page: number;
    type: string;
    order: number;
    cover_type: string;
    cover_url: string;
    cover_path: string;
    rating: number;
}

interface Serie {
    id: number;
    title: string;
    original_title: string;
    author: string;
    status: string;
    genres: BookGenre[];
    books: Book[];
}

interface Props {
    serie: Serie;
    books: Book[];
}

const sections = [
    {
        type: 'main' as const,
        title: 'Main Books',
    },
    {
        type: 'prequel' as const,
        title: 'Prequels',
    },
    {
        type: 'sequel' as const,
        title: 'Sequels',
    },
    {
        type: 'spin-off' as const,
        title: 'Spin-offs',
    },
];

export default function Show({serie}: Props) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Books',
            href: route('books.index'),
        },
        {
            title: serie.title,
            href: '#',
        },
    ];

    const totalBooks = serie.books.length || 0;
    const {processing, delete: destroy} = useForm();
    const [openBookModal, setOpenBookModal] = useState(false);
    
    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete ${title}?`)) {
            destroy(route('books-series.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={serie.title} />
            <section className="">
                <div className="mx-auto flex flex-col p-6">
                    <div className="mt-auto flex items-start gap-10">
                        {/* Información */}
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold ">
                                {serie.title}
                            </h1>
                            <h2 className="mt-2 text-3xl font-bold text-muted-foreground ">
                                {serie.original_title}
                            </h2>
                            <h5 className="mt-4 font-bold">
                                {serie.author}
                            </h5>
                            
                            <div className="mt-5 flex flex-wrap gap-2">
                                {serie.genres.map((genre) => (
                                    <Badge
                                        key={genre.id}
                                        className="bg-violet-500 text-white hover:bg-violet-500"
                                    >
                                        {genre.genre}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mt-6 flex items-center gap-6">
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Star
                                        className="h-5 w-5 fill-current"
                                    />
                                    <span className="text-lg font-semibold">
                                        ?/5
                                    </span>
                                </div>
                                <Badge className="bg-violet-500 text-white hover:bg-violet-500">
                                    {serie.status}
                                </Badge>
                                <Badge className="bg-violet-500 text-white hover:bg-violet-500">
                                    {totalBooks}{totalBooks === 1 ? ' Book' : ' Books'}
                                </Badge>
                            </div>
                            <div className="mt-8 flex gap-3">
                                <Link href={route('games.edit', serie.id)}>
                                    <Button className="hover:bg-violet-700 text-white bg-violet-500">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    variant="destructive"
                                    onClick={() => handleDelete(serie.id, serie.title)}
                                    disabled={processing}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Books */}
                    <div className="mt-12">
                        <div className="mb-10 flex flex-row justify-between">
                            <h2 className="text-3xl font-bold">
                                Books
                            </h2>
                            <Button
                                type="button"
                                title="Add Book"
                                className="text-white bg-violet-500 hover:bg-violet-700  hover:text-white"
                                onClick={() => setOpenBookModal(true)}
                                >
                                <Plus className="!h-6 !w-6 stroke-3" /> Add Book
                            </Button>
                            <AddBookModal
                                open={openBookModal}
                                onOpenChange={setOpenBookModal}
                                serieId={serie.id}
                            />
                        </div>

                        <div className="space-y-14">
                            {sections.map((section) => {
                                const books = serie.books
                                    .filter(
                                        (book) =>
                                            book.type === section.type,
                                    )
                                    .sort(
                                        (a, b) =>
                                            a.order - b.order,
                                    );

                                return (
                                    <BookSection
                                        key={section.type}
                                        title={section.title}
                                        books={books}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}