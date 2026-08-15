import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BookDetails from "@/components/books/book-details";
import BookForm from "@/components/books/book-form";

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
    notes: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book: Book;
}

export default function ShowEditBookModal({ open, onOpenChange, book, }: Props) {

    const [editing, setEditing] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className="border-b p-6">
                    <DialogTitle>
                        {book.title}
                    </DialogTitle>

                    <DialogDescription>
                        {book.original_title}
                    </DialogDescription>
                </DialogHeader>
                
                {!editing ? (
                    <BookDetails
                        book={book}
                        onEdit={() => setEditing(true)}
                        closeModal={() => onOpenChange(false)}
                    />
                ) : (
                    <BookForm
                        book={book}
                        closeEditing={() => setEditing(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}