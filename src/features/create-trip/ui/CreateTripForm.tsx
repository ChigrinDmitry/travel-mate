import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../../shared/ui';
import { useTripStore } from '../../../entities/trip';

interface CreateTripFormProps {
    onSuccess?: () => void;
}

export const CreateTripForm = ({ onSuccess }: CreateTripFormProps) => {
    const navigate = useNavigate();

    const { createTrip } = useTripStore();

    const [formData, setFormData] = useState({
        name: '',
        destination: '',
        startDate: '',
        endDate: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.destination.trim()) {
            newErrors.destination = 'Destination is required';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        }

        if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
            newErrors.endDate = 'End date must be after start date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        createTrip({
            name: formData.name,
            destination: formData.destination,
            startDate: formData.startDate,
            endDate: formData.endDate,
            status: 'planning',
        });

        const trips = useTripStore.getState().trips;
        const newTrip = trips[trips.length - 1];

        onSuccess?.();
        navigate(`/trip/${newTrip.id}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Trip Name"
                placeholder="e.g. Paris Adventure"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                required
            />

            <Input
                label="Destination"
                placeholder="e.g. Paris, France"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                error={errors.destination}
                required
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    error={errors.startDate}
                    required
                />

                <Input
                    label="End Date"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    error={errors.endDate}
                    required
                />
            </div>

            {formData.startDate && formData.endDate && formData.endDate >= formData.startDate && (
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    Trip duration: {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                    Create Trip
                </Button>
            </div>
        </form>
    );
};