import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTripStore } from '../../../entities/trip';
import { Button } from '../../../shared/ui';
import { ArrowLeft, Settings, Share2 } from 'lucide-react';

export const TripPlanning = () => {
    const { tripId } = useParams<{ tripId: string }>();

    const navigate = useNavigate();

    const { currentTrip, setCurrentTrip } = useTripStore();

    useEffect(() => {
        if (tripId) {
            setCurrentTrip(tripId);
        }
    }, [tripId, setCurrentTrip]);

    if (!currentTrip) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip not found</h2>
                    <p className="text-gray-600 mb-4">The trip you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">

            <header className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/dashboard')}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{currentTrip.name}</h1>
                            <p className="text-sm text-gray-600">{currentTrip.destination}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                            <Share2 className="w-5 h-5 mr-2" />
                            Share
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Settings className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">

                <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-4">Timeline</h2>

                        {currentTrip.days.map((day) => (
                            <div key={day.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <div className="font-medium text-gray-900 mb-2">
                                    Day {day.dayNumber} - {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </div>

                                {day.places.length > 0 ? (
                                    <div className="space-y-2">
                                        {day.places.map((place) => (
                                            <div key={place.id} className="text-sm p-2 bg-white rounded border border-gray-200">
                                                {place.name}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No places added yet</p>
                                )}

                                <Button variant="ghost" size="sm" className="mt-2 w-full">
                                    + Add Place
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 bg-gray-100 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <div className="text-6xl mb-4">🗺️</div>
                                <p className="text-lg font-medium">Map will be here</p>
                                <p className="text-sm">Coming in next phase</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}