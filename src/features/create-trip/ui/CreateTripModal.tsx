import { Dialog } from '../../../shared/ui';
import { CreateTripForm } from './CreateTripForm';

interface createTripModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateTripModal = ({ open, onClose}: createTripModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} title="Create New Trip">
            <CreateTripForm onSuccess={onClose} />
        </Dialog>
    );
};