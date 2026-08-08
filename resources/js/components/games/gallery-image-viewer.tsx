import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface GalleryImageViewerProps {
    src: string;
    alt?: string;
}

export default function GalleryImageViewer({
    src,
    alt = "Gallery image",
}: GalleryImageViewerProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Thumbnail */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="h-full w-full cursor-zoom-in"
            >
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </button>

            {/* Fullscreen viewer */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-[95vw] border-0 bg-black/90 p-2 sm:max-w-[90vw]">
                    <DialogTitle className="sr-only">
                        {alt}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Image preview of {alt}
                    </DialogDescription>

                    <div className="flex max-h-[90vh] items-center justify-center">
                        <img
                            src={src}
                            alt={alt}
                            className="max-h-[85vh] max-w-full object-contain"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}