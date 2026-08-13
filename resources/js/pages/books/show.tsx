import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

interface Props {
    serie: Serie
}

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={serie.title} />
        </AppLayout>
    )
}