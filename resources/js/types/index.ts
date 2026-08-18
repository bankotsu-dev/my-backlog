import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PageLinkItem {
    active: boolean;
    label: string;
    url: string;
}

export interface Filters {
    search: string;
    perPage: number;
    status: string;
}

export interface Genre {
    id: number;
    genre: string;
}

export interface Season {
    id: number;
    anime_id: number;
    title: string;
    original_title: string | null;
    status: string;
    last_watched: number | null;
    type: string;
    order: number;
    cover_type: string | null;
    cover_url: string | null;
    cover_path: string | null;
    rating: number | null;
    notes: string | null;
}

export interface Anime {
    id: number;
    user_id: number;
    title: string;
    original_title: string | null;
    status: string;
    description: string | null;
    cover_type: string | null;
    cover_url: string | null;
    cover_path: string | null;
    rating: number | null;
    genres: Genre[] | null;
    seasons: Season[] | null;
}
