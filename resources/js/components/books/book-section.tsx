import BookCard from "@/components/books/book-card";

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

export default function BookSection({
    title,
    books,
}: {
    title: string;
    books: Book[];
}) {
    if (books.length === 0) {
        return null;
    }

    return (
        <section>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>

                    <div className="mt-2 h-1 w-full rounded-full bg-violet-500" />
                </div>

                <span className="text-sm text-muted-foreground">
                    {books.length}{' '}
                    {books.length === 1 ? 'book' : 'books'}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))}
            </div>
        </section>
    );
}