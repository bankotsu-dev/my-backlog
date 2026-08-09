import * as React from "react";
import { ChevronDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MultiSelectProps<T, TValue extends string | number> {
    options: T[];
    value: TValue[];
    onChange: (value: TValue[]) => void;
    getValue: (item: T) => TValue;
    getLabel: (item: T) => string;
    placeholder?: string;
}

export default function MultiSelect<
    T,
    TValue extends string | number
>({
    options,
    value,
    onChange,
    getValue,
    getLabel,
    placeholder = "Select...",
}: MultiSelectProps<T, TValue>) {

    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const filtered = options.filter((item) =>
        getLabel(item)
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function toggle(item: T) {
        const id = getValue(item);
        if (value.includes(id)) {
            onChange(value.filter((v) => v !== id));
            return;
        }
        onChange([...value, id]);
    }

    return (

        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="mt-3">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full min-h-10 h-auto justify-between"
                >
                    <div className="flex flex-wrap gap-1">
                        {value.length === 0 && (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}

                        {options
                            .filter((item) =>
                                value.includes(getValue(item))
                            )
                            .map((item) => (
                                <Badge
                                    key={String(getValue(item))}
                                    variant="secondary"
                                    className="gap-1"
                                >
                                    {getLabel(item)}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggle(item);
                                        }}
                                    />
                                </Badge>
                            ))
                        }
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[320px] p-0 z-50" 
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <div className="p-2 border-b">
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <ScrollArea className="h-64">
                    <div className="p-2 space-y-1">
                        {filtered.map((item) => {
                            const id = getValue(item);
                            const checked = value.includes(id);

                            return (
                                <div
                                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-accent"
                                    
                                    key={id}
                                >
                                    <Checkbox 
                                    checked={checked} 
                                    tabIndex={-1} 
                                    onCheckedChange={() => toggle(item)} 
                                    onClick={(e) => e.stopPropagation()} 
                                    />
                                    <span>{getLabel(item)}</span>
                                </div>
                            );

                        })}

                        {filtered.length === 0 && (

                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No results.
                            </div>

                        )}

                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}