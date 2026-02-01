import type { Place } from "../../place/index";

export interface Trip {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    coverImage?: string;
    days: Day[];
    status: 'draft' | 'planning' | 'ready' | 'completed';
    createdAt: string;
    updatedAt: string;
}

export interface Day {
    id: string;
    date: string;
    dayNumber: number;
    places: Place[];
    notes?: string;
}