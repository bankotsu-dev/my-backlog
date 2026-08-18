import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const currentPath = new URL(
        page.url,
        window.location.origin,
    ).pathname;

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Lists</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const itemPath = new URL(
                        item.url,
                        window.location.origin,
                    ).pathname;

                    const isActive =
                        currentPath === itemPath ||
                        currentPath.startsWith(`${itemPath}/`);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                            >
                                <Link href={item.url} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
