import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui';

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-7xl font-bold text-gray-9 mb-6 leading-tight">
                        Plan your perfect journey in minutes, not hours!
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Visualise your entire trip!
                    </p>
                </div>

                <div>
                    <Button size="lg" onClick={() => navigate('/dashboard')}>
                        Start Planning
                    </Button>
                    <Button size="lg" variant="ghost">
                        See, how it works
                    </Button>
                </div>
            </div>
    </div>
    );
};