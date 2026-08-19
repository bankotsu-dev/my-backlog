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

interface Timestamps {
    created_at: string | null;
    updated_at: string | null;
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

export interface Genre extends Timestamps {
    id: number;
    genre: string;
}

export interface Season extends Timestamps {
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

export interface Anime extends Timestamps {
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
    genres: Genre[];
    seasons: Season[];
}

export interface Book extends Timestamps {
    id: number;
    serie_id: number;
    title: string;
    original_title: string | null;
    status: string;
    last_page: number | null;
    type: string;
    order: number;
    cover_type: string | null;
    cover_url: string | null;
    cover_path: string | null;
    rating: number | null;
    notes: string | null;
}

export interface Serie extends Timestamps {
    id: number;
    user_id: number;
    title: string;
    original_title: string | null;
    author: string | null;
    status: string;
    rating: number | null;
    books: Book[];
    genres: Genre[];
}

export interface GameImage extends Timestamps {
    id: number;
    game_id: number;
    source: string;
    url: string;
    path: string;
}

export interface Game extends Timestamps {
    id: number;
    user_id: number;
    title: string;
    original_title: string | null;
    status: string;
    description: string | null;
    notes: string | null;
    cover: string | null;
    cover_public_id: string | null;
    background_image: string | null;
    background_public_id: string | null;
    developer: string | null;
    publisher: string | null;
    rating: number | null;
    hg: boolean;
    version: string | null;
    genres: Genre[];
    images: GameImage[];
}


