import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from "react";
import AddGameModal from '@/components/games/add-game-modal';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import GameList from '@/components/games/game-list';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Games',
        href: '/games',
    },
];

interface GameGenre {
    id: number;
    genre: string;
}

interface Game {
    id: number;
    title: string;
    status: string;
    description: string | null;
    notes: string | null;
    cover: string | null;
    background_image: string | null;
    developer: string | null;
    publisher: string | null;
    rating: number;
    hg: boolean;
    version: string | null;
    genres: GameGenre[];
}

export default function Index({ games, gameGenres }: { games: Game[]; gameGenres: GameGenre[] }) {

    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Games" />
            <div className="mb-6 flex items-center justify-between gap-4 mx-2">
                {/* pending search functionality, will be implemented in the future */}
                <Input
                    placeholder="Search games..."
                    className="max-w-md"
                />
                <div className="flex items-center justify-end">
                    <Button onClick={() => setOpen(true)} 
                        className="dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-500 dark:text-white"
                    >
                        Add Game
                    </Button>
                </div>
                <AddGameModal
                    open={open}
                    onOpenChange={setOpen}
                    gameGenres={gameGenres}
                />
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <GameList
                    games={games}
                />
            </div>
        </AppLayout>
    );
}
