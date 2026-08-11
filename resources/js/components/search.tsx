import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import React from 'react';
import { Filters } from '@/types';

type searchProps = {
    search: string,
    setSearch: (value: string) => void,
    filters: Filters,
    routeName: string,
}

export default function Search({search, setSearch, filters, routeName}: searchProps) {

    const [timeoutId, setTimeoutId]  = React.useState<ReturnType<typeof setTimeout> | null>(null)

    // Claen up on component unmount
    React.useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [timeoutId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        const userInput = e.target.value;
        setSearch(userInput);

        // Clear previous timeput if exists
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        // Set new timeout
        const newTimeoutId = setTimeout(() => {
            const queryString = userInput ? { ...filters, search: userInput } : {}

            // Manual visit to controller
            router.get(route(routeName), queryString, {
                preserveState: true,
                preserveScroll: true
        })
        }, 700)

        setTimeoutId(newTimeoutId)

    }

    /* const handleReset = () => {
        setSearch('')

        router.get(route(routeName), {...filters, search: ''}, {
            preserveState: true,
            preserveScroll: true
        })
    } */

    return (
        <div className='flex items-center w-full max-w-xl space-x-2'>
            <div className='flex-1'>
                <Input
                    type='text'
                    placeholder='Search...'
                    name='search'
                    onChange={handleChange}
                    value={search}
                />
            </div>
            {/* <Button
                variant="destructive"
                className='self-end cursor-pointer'
                onClick={handleReset}
            >
                <X />
            </Button> */}
        </div>
    )
}