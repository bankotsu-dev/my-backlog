import { useState } from "react";
import { useForm } from '@inertiajs/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import GalleryImageViewer from "@/components/games/gallery-image-viewer";
import AddImageModal from "@/components/games/add-image-modal";

interface Image {
    id: number;
    game_id: number;
    source: string;
    url: string;
    path: string;
}
export default function GameGallery({ images, gameId }: { images: Image[], gameId: number }) {

    const { processing, delete: destroy } = useForm();
    const [open, setOpen] = useState(false);

    const handleDeleteImage = (imageId: number) => { 
        if (confirm('Are you sure you want to delete this image?')) { 
            destroy(route('game-images.destroy', imageId), { preserveScroll: true }); 
        } 
    };

    return (
        <Card className="bg-black/50 backdrop-blur-xs text-white">
            <AddImageModal
                open={open}
                onOpenChange={setOpen}
                gameId={gameId}
            />
            <CardHeader className="flex flex-row space-y-1.5 justify-between">
                <CardTitle className="">Gallery</CardTitle>
                <Button
                    variant="ghost"
                    title="View details"
                    className="text-white hover:bg-violet-700 w-8 h-8"
                    onClick={() => setOpen(true)}
                    >
                    <Plus className="!h-6 !w-6 stroke-3" />
                </Button>
            </CardHeader>
            <CardContent>
                <Carousel
                    className="w-full"
                    opts={{ loop: true }}
                >
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem
                                key={image.id ?? `${image.source}-${index}`}
                                className="basis-full sm:basis-1/2 lg:basis-1/3"
                            >
                                <div className="p-1">
                                    <Card className="relative overflow-hidden bg-black">
                                        <CardContent className="flex aspect-video items-center p-0">
                                            <GalleryImageViewer
                                                src={image.url}
                                                alt={`Gallery image ${index + 1}`}
                                            />
                                            <Button
                                                type="button" 
                                                variant="destructive"  
                                                className="absolute right-2 top-2 h-8 w-6 z-10" 
                                                onClick={() => handleDeleteImage(image.id) } 
                                                disabled={processing} 
                                            > 
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {images.length > 1 && (
                        <>
                            <CarouselPrevious />
                            <CarouselNext />
                        </>
                    )}
                </Carousel>
            </CardContent>
        </Card>
    );
}