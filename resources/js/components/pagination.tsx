import { Filters, PageLinkItem } from "@/types";
import { Link, router } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight  } from 'lucide-react';


type PaginationProps = {
    links: PageLinkItem[],
    perPage: number
    setCurrentPage: (value: number) => void
    filters: Filters,
    routeName: string,
}

export default function Pagination({ links, perPage, setCurrentPage, filters, routeName }: PaginationProps) {

    const handleChange = (value: string) => {
        const newPerPage = value
        setCurrentPage(parseInt(newPerPage))

        router.get(route(routeName), {...filters, perPage: newPerPage}, {
            preserveState: true,
            preserveScroll: true
        })
    }

    return (
        <div className="flex items-center justify-center gap-4">
            <div className="flex items-center space-x-2">
                <Select value={perPage.toString()} onValueChange={handleChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Per Page" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-1'>
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? '#'}
                        
                        className={`px-3 py-1 text-sm rounded border border-violet-500 text-black dark:text-white bg-background 
                                ${link.active ? 'bg-violet-500 font-extrabold text-white' : ''}
                                ${!link.url ? 'opacity-50 pointer-events-none' : 'hover:vbg-gray-100'}`}
                    >
                        {link.label === 'pagination.previous'
                            ? (<ChevronLeft className="h-5 w-5" />)
                            : link.label === 'pagination.next'
                            ? (<ChevronRight  className="h-5 w-5" />)
                            : link.label
                        }
                    </Link>
                ))}
            </div>
        </div>
    )
}