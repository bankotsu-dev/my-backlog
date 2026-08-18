import { useState } from "react";
import { Season } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SeasonDetails from "@/components/animes/season-details";
import SeasonForm from "@/components/animes/season-form";


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    season: Season;
}

export default function ShowEditSeasonModal({ open, onOpenChange, season, }: Props) {

    const [editing, setEditing] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className="border-b p-6">
                    <DialogTitle>
                        {season.title}
                    </DialogTitle>

                    <DialogDescription>
                        {season.original_title}
                    </DialogDescription>
                </DialogHeader>
                
                {!editing ? (
                    <SeasonDetails
                        season={season}
                        onEdit={() => setEditing(true)}
                        closeModal={() => onOpenChange(false)}
                    />
                ) : (
                    <SeasonForm
                        season={season}
                        closeEditing={() => setEditing(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}