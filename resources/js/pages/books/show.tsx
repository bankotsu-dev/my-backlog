import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

export default function Show({serie, books}: Props) {
    
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={serie.title} />
        </AppLayout>
    )
}