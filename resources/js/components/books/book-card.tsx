import { Link } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { BookOpen, Star } from "lucide-react";

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

export default function BookCard({ book }: { book: Book }) {
    return (
        <Link
            href={route('books.show', book.id)}
            className="group block"
        >
            <Card className="overflow-hidden border-0 bg-transparent shadow-none">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                    {book.cover_url ? (
                        <img
                            src={book.cover_url}
                            alt={book.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <BookOpen className="h-16 w-16 text-muted-foreground" />
                        </div>
                    )}

                    {/* Order */}
                    <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                        {String(book.order).padStart(2, '0')}
                    </div>
                </div>

                <div className="mt-3">
                    <h3 className="line-clamp-2 font-semibold transition group-hover:text-violet-400">
                        {book.title}
                    </h3>

                    {book.original_title && (
                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                            {book.original_title}
                        </p>
                    )}

                    {/* Rating */}
                    {book.rating != null && (
                        <div className="mt-2 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    className={`h-4 w-4 ${
                                        index < book.rating!
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-muted'
                                    }`}
                                />
                            ))}

                            <span className="ml-1 text-xs text-muted-foreground">
                                {book.rating}
                            </span>
                        </div>
                    )}
                </div>
            </Card>
        </Link>
    );
}