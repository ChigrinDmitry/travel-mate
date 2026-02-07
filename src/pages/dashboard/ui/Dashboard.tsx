import { useNavigate } from 'react-router-dom';
import { useTripStore, TripCard } from '../../../entities/trip';
import { Button } from '../../../shared/ui';
import { Plus, Map } from 'lucide-react';
import { useState } from 'react';

export const Dashboard = () => {
    const navigate = useNavigate();
    const { trips, setCurrentTrip } = useTripStore();
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'drafts'>('all');


    const handleTripClick = (tripId: string) => {
        setCurrentTrip(tripId);
        navigate(`/trip/${tripId}`)
    };

    const filteredTrips = trips.filter((trip) => {
        if (filter === 'all') return true;
        if (filter === 'drafts') return trip.status === 'draft' || trip.status === 'planning';
        if (filter === 'upcoming') return new Date(trip.startDate) > new Date();
        if (filter === 'past') return new Date(trip.endDate) < new Date();
        return true;
    });

    return (
        <div className='min-h-screen bg-gray-50'>
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Map className="w-8 h-8 text-primary-600" />
                        <h1 className="text-2xl font-bold text-gray-900">TravelMate</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button onClick={() => navigate('/dashboard/create')}>
                            <Plus className="w-5 h-5 mr-2" />
                            New Trip
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h2>
                    <p className="text-gray-600">Plan, organize, and track all your adventures</p>
                </div>
            </div>

            <div>
                {(['all', 'upcoming', 'past', 'drafts'] as const).map((filterOption) => (
                    <Button
                       key={filterOption}
                       variant={filter === filterOption ? 'primary' : 'ghost'}
                       size="sm"
                       onClick={() => setFilter(filterOption)}
                    >
                        {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                    </Button>
                ))}
            </div>

            {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                onClick={() => handleTripClick(trip.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No trips yet' : `No ${filter} trips`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Start planning your first adventure!'
                : 'Try changing the filter or create a new trip'}
            </p>
            {filter === 'all' && (
              <Button onClick={() => navigate('/dashboard/create')}>
                <Plus className="w-5 h-5 mr-2 text-gray-600" />
                <p className='text-gray-600'>Create Your First Trip</p>
              </Button>
            )}
          </div>
        )}
        </div>
    )
}