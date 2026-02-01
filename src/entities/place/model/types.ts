export type PlaceCategory = 
    | 'accomodation'
    | 'attraction'
    | 'restaurant'
    | 'activity'
    | 'shopping'
    | 'transport'
    | 'other';

export interface Place {
    id: string;
    name: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    order: number;
    startTime?: string;
    duration: number;
    category: PlaceCategory;
    notes?: string;
    estimatedCost: number;
}