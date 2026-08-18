import { useState } from "react";
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem, Anime, Genre } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Edit, MonitorPause, Plus, Star, Trash2 } from 'lucide-react';
import SeasonSection from '@/components/animes/season-section';
import AddSeasonModal from "@/components/animes/add-season-modal";
import EditAnimeModal from "@/components/animes/edit-anime-modal";

interface Props {
    anime: Anime;
    genres: Genre[];
}

const sections = [
    {
        type: 'season' as const,
        title: 'Seasons',
    },
    {
        type: 'movie' as const,
        title: 'Movies',
    },
    {
        type: 'ova' as const,
        title: 'Ovas',
    },
    {
        type: 'special' as const,
        title: 'Specials',
    },
];

export default function Show({anime, genres}: Props) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Animes',
            href: route('animes.index'),
        },
        {
            title: anime.title,
            href: '#',
        },
    ];

    const {processing, delete: destroy} = useForm();
    const [openSeasonModal, setOpenSeasonModal] = useState(false);
    const [openEditAnimeModal, setOpenEditAnimeModal] = useState(false);
    
    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            destroy(route('animes.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={anime.title} />
            <EditAnimeModal 
                open={openEditAnimeModal} 
                onOpenChange={setOpenEditAnimeModal} 
                genres={genres}
                anime={anime} 
            />
            <AddSeasonModal
                open={openSeasonModal}
                onOpenChange={setOpenSeasonModal}
                animeId={anime.id}
            />
            <section className="">
                <div className="mx-auto flex flex-col p-6">
                    <div className="mt-auto flex items-start gap-10">
                        <div className="w-60 shrink-0">
                            {anime.cover_url ? (
                                <img
                                    src={anime.cover_url}
                                    alt={anime.title}
                                    className="aspect-[2/3] rounded-xl object-fill shadow-2xl"
                                />
                            ) : (
                                <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-muted shadow-2xl">
                                    <MonitorPause className="h-20 w-20 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                        {/* Información */}
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold ">
                                {anime.title}
                            </h1>
                            <h2 className="mt-2 text-3xl font-bold text-muted-foreground ">
                                {anime.original_title}
                            </h2>
                            
                            <div className="mt-5 flex flex-wrap gap-2">
                                {anime.genres?.map((genre) => (
                                    <Badge
                                        key={genre.id}
                                        className="bg-violet-500 text-white hover:bg-violet-500"
                                    >
                                        {genre.genre}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mt-6 flex items-center gap-6">
                                {anime.rating !== null && anime.rating > 0 && (
                                    <div className="flex items-center gap-2 text-yellow-400">
                                        <Star
                                            className="h-5 w-5 fill-current"
                                        />
                                        <span className="text-lg font-semibold">
                                            {anime.rating}/5
                                        </span>
                                    </div>  
                                )}
                                <Badge className="bg-violet-500 text-white hover:bg-violet-500">
                                    {anime.status}
                                </Badge>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {anime.description}
                            </div>
                            <div className="mt-5 flex gap-3">
                                <Button
                                    type="button" 
                                    className="hover:bg-violet-700 text-white bg-violet-500"
                                    onClick={() => setOpenEditAnimeModal(true)}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button 
                                    variant="destructive"
                                    onClick={() => handleDelete(anime.id, anime.title)}
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
                                Seasons
                            </h2>
                            <Button
                                type="button"
                                title="Add Book"
                                className="text-white bg-violet-500 hover:bg-violet-700  hover:text-white"
                                onClick={() => setOpenSeasonModal(true)}
                                >
                                <Plus className="!h-6 !w-6 stroke-3" /> Add Season
                            </Button>
                        </div>

                        <div className="space-y-14">
                            {sections.map((section) => {
                                const seasons = (anime.seasons ?? [])
                                    .filter(
                                        (season) =>
                                            season.type === section.type,
                                    )
                                    .sort(
                                        (a, b) =>
                                            a.order - b.order,
                                    );

                                return (
                                    <SeasonSection
                                        key={section.type}
                                        title={section.title}
                                        seasons={seasons}
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