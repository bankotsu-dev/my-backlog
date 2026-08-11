import { Filters } from "@/types";
import { router } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Item {
    label: string;
    value: string;
}

interface Props {
    items: Item[]; 
    filters: Filters;
    routeName: string;
    status: string;
    setStatus: (value: string) => void;
}

export default function StatusFilter({ items, filters, routeName, status, setStatus }: Props) {

    const handleChange = (value: string) => {
        const newStatus = value === 'all' ? '' : value;
        setStatus(newStatus);

        router.get(route(routeName), {...filters, status: newStatus}, {
            preserveState: true,
            preserveScroll: true
        })
    }

    return (
        <div>
            <Select value={status} onValueChange={handleChange}>
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    {items.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}