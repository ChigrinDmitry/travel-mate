import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Trip, Day } from './types';
import type { Place } from '../../place';

interface TripStore {
    // state
    trips: Trip[];
    currentTrip: Trip | null;

    // actions
    createTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt' | 'days'>) => void;
    deleteTrip: (id: string) => void;
    setCurrentTrip: (id: string | null) => void;
    updateTrip: (id: string, updates: Partial<Trip>) => void;

    // days
    addDay: (day: Omit<Day, 'id' | 'places'>) => void;

    // places
    addPlace: (dayId: string, place: Place) => void;
    deletePlace: (dayId: string, placeId: string) => void;
    updatePlace: (dayId: string, placeId: string, updates: Partial<Place>) => void;
}

const generateDays = (startDate: string, endDate: string): Day[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days: Day[] = [];

    let dayNumber = 1;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push({
            id: crypto.randomUUID(),
            date: d.toISOString().split('T')[0],
            dayNumber,
            places: [],
            notes: '',
        });
        dayNumber++;
    }

    return days;
};

export const useTripStore = create<TripStore>()(
    persist(
        (set, get) => ({
            trips: [],
            currentTrip: null,

            createTrip: (tripData) => {
                const days = generateDays(tripData.startDate, tripData.endDate);
                const newTrip: Trip = {
                    ...tripData,
                    id: crypto.randomUUID(),
                    days,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                set((state) => ({
                    trips: [...state.trips, newTrip],
                }))
            },

            deleteTrip: (id) => {
                set((state) => ({
                    trips: state.trips.filter((t) => t.id !== id),
                    currentTrip: state.currentTrip?.id === id ? null : state.currentTrip, 
                }));
            },

            setCurrentTrip: (id) => {
                if (!id) {
                    set({ currentTrip: null});
                    return;
                }
                const trip = get().trips.find((t) => t.id === id);
                set({ currentTrip: trip || null });
            },

            updateTrip: (id, updates) => {
                set((state) => ({
                  trips: state.trips.map((t) =>
                    t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
                  ),
                  currentTrip: state.currentTrip?.id === id
                    ? { ...state.currentTrip, ...updates, updatedAt: new Date().toISOString() }
                    : state.currentTrip,
                }));
            },

            addDay: (dayData) => {
                const currentTrip = get().currentTrip;
                if (!currentTrip) return;
                
                const newDay: Day = {
                  ...dayData,
                  id: crypto.randomUUID(),
                  places: [],
                };
                
                const updatedTrip = {
                  ...currentTrip,
                  days: [...currentTrip.days, newDay],
                  updatedAt: new Date().toISOString(),
                };
                
                set((state) => ({
                  currentTrip: updatedTrip,
                  trips: state.trips.map((t) => (t.id === currentTrip.id ? updatedTrip : t)),
                }));
              },

              addPlace: (dayId, place) => {
                const currentTrip = get().currentTrip;
                if (!currentTrip) return;
                
                const updatedDays = currentTrip.days.map((day) =>
                  day.id === dayId
                    ? { ...day, places: [...day.places, place] }
                    : day
                );
                
                const updatedTrip = {
                  ...currentTrip,
                  days: updatedDays,
                  updatedAt: new Date().toISOString(),
                };
                
                set((state) => ({
                  currentTrip: updatedTrip,
                  trips: state.trips.map((t) => (t.id === currentTrip.id ? updatedTrip : t)),
                }));
              },

              deletePlace: (dayId, placeId) => {
                const currentTrip = get().currentTrip;
                if (!currentTrip) return;
                
                const updatedDays = currentTrip.days.map((day) =>
                  day.id === dayId
                    ? { ...day, places: day.places.filter((p) => p.id !== placeId) }
                    : day
                );
                
                const updatedTrip = {
                  ...currentTrip,
                  days: updatedDays,
                  updatedAt: new Date().toISOString(),
                };
                
                set((state) => ({
                  currentTrip: updatedTrip,
                  trips: state.trips.map((t) => (t.id === currentTrip.id ? updatedTrip : t)),
                }));
              },

              updatePlace: (dayId, placeId, updates) => {
                const currentTrip = get().currentTrip;
                if (!currentTrip) return;
                
                const updatedDays = currentTrip.days.map((day) =>
                  day.id === dayId
                    ? {
                        ...day,
                        places: day.places.map((p) =>
                          p.id === placeId ? { ...p, ...updates } : p
                        ),
                      }
                    : day
                );
                
                const updatedTrip = {
                  ...currentTrip,
                  days: updatedDays,
                  updatedAt: new Date().toISOString(),
                };
                
                set((state) => ({
                  currentTrip: updatedTrip,
                  trips: state.trips.map((t) => (t.id === currentTrip.id ? updatedTrip : t)),
                }));
              },        
            }),
            { 
                name: 'travel-mate-storage', 
            }
    )
)