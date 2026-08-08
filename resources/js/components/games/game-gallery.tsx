import { useForm } from '@inertiajs/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import GalleryImageViewer from "@/components/games/gallery-image-viewer";

interface Image {
    id: number;
    game_id: number;
    source: string;
    url: string;
    path: string;
}
export default function GameGallery({ images }: { images: Image[] }) {

    const { processing, delete: destroy } = useForm();

    const handleDeleteImage = (imageId: number) => { 
        if (confirm('Are you sure you want to delete this image?')) { 
            destroy(route('game-images.destroy', imageId), { preserveScroll: true }); 
        } 
    };

    return (
        <Card className="bg-black/50 backdrop-blur-xs text-white">
            <CardHeader>
                <CardTitle>Gallery</CardTitle>
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