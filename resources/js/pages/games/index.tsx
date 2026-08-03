import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddGameModal from '@/components/games/add-game-modal';
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Games',
        href: '/games',
    },
];

interface Game {
    id: number;
    title: string;
    status: string;
    rating: number;
    hg: boolean;
}

export default function Index({ games }: { games: Game[] }) {

    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Games" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-end">
                    <Button onClick={() => setOpen(true)}>
                        Add Game
                    </Button>
                </div>
                <AddGameModal
                    open={open}
                    onOpenChange={setOpen}
                />
                <Table>
                    <TableCaption>A list of your recent games.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>HG</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {games.map((game) => (
                            <TableRow key={game.id}>
                                <TableCell>{game.title}</TableCell>
                                <TableCell>{game.status}</TableCell>
                                <TableCell>{game.rating}</TableCell>
                                <TableCell>{game.hg}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
