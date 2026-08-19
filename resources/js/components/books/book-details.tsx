import { useForm } from '@inertiajs/react';
import { type Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Star } from 'lucide-react';

interface Props {
    book: Book;
    onEdit: () => void;
    closeModal: () => void;
}

export default function BookDetails({book,onEdit,closeModal}: Props) {

    const {processing, delete: destroy} = useForm();

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            destroy(route('books.destroy', id));
        }
    };

    return (
        <div className="space-y-6">

            {/* Main content */}
            <div className="flex flex-col gap-6 sm:flex-row">
                {/* Cover */}
                <div className="w-full shrink-0 sm:w-40">
                    <div className="aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                        {book.cover_url ? (
                            <img
                                src={book.cover_url}
                                alt={book.title}
                                className="h-full w-full object-fill"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <BookOpen className="h-20 w-20 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Information */}
                <div className="flex flex-1 flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Type
                            </p>

                            <p>
                                {book.type}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Order
                            </p>

                            <p className="mt-1 font-medium">
                                #{String(book.order).padStart(2, '0')}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Status
                            </p>

                            <p>
                                {book.status}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Last Page Read
                            </p>

                            <p className="mt-1 font-medium">
                                {book.last_page ?? '—'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Rating
                        </p>

                        <div className="mt-1 flex items-center gap-1">
                            {Array.from({ length: 5 }).map(
                                (_, index) => (
                                    <Star
                                        key={index}
                                        className={`h-5 w-5 ${
                                            book.rating &&
                                            index < book.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-muted'
                                        }`}
                                    />
                                ),
                            )}

                            <span className="ml-2 text-sm text-muted-foreground">
                                {book.rating != null
                                    ? `${book.rating}/5`
                                    : 'Not rated'}
                            </span>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                                Notes
                            </p>

                            <p className="mt-1 font-medium">
                                {book.notes ?? '—'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Footer */}
            <div className="flex justify-between">
                <Button
                    variant="destructive"
                    type="button" 
                    onClick={() => handleDelete(book.id, book.title)}
                    disabled={processing}
                >
                    Delete
                </Button>
                <div className="flex gap-2">
                    <Button
                        className="hover:bg-neutral-700 text-white bg-neutral-500 hover:text-white"
                        type="button" 
                        onClick={closeModal}
                    >
                        Close
                    </Button>
                    <Button
                        className="text-white bg-violet-500 hover:bg-violet-700"
                        type="button" 
                        onClick={onEdit}
                    >
                        Edit Book
                    </Button>
                </div>
            </div>
        </div>
    );
}