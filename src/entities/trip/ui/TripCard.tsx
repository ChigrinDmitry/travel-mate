import { Card } from "../../../shared/ui";

import { Calendar, MapPin, Clock } from 'lucide-react';

import type { Trip } from '../model/types';
import { format } from 'date-fns';

interface TripCardProps {
    trip: Trip;
    onClick?: () => void;
}

export const TripCard = ({ trip, onClick }: TripCardProps) => {
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const daysCount = trip.days.length;

    const statusColors = {
        draft: 'bg-gray-100 text-gray-700',
        planning: 'bg-blue-100 text-blue-700',
        ready: 'bg-green-100 text-green-700',
        completed: 'bg-purple-100 text-purple-700',
    };

    return (
        <Card hover onClick={onClick} className="overflow-hidden">
            <div className=" h-48 bg-gradient-to-br from-primary-400 to-blue-500 relative">
                {trip.coverImage ? (
                    <img 
                        src={trip.coverImage}
                        alt={trip.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                )}       

                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusColors[trip.status]}`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                </div> 
            </div>

            <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                    {trip.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{trip.destination}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                            {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
                        </span>
                    </div>
                </div>
                <div className="text-gray-700 font-medium">
                    {daysCount} {daysCount === 1 ? 'day' : 'days'}
                </div>
            </div>
        </Card>
    );
};