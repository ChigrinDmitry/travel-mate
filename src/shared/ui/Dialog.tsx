import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const Dialog = ({ open, onClose, title, children }: DialogProps) => {

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {

        }
    }, [open]);

    if (!open) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2>{title}</h2>
                    <Button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6"/>
                    </Button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};