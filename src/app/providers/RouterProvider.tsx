import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from '../../pages/landing/ui';
import { Dashboard } from '../../pages/dashboard/';
//import { TripPlanning } from '../../pages/trip-planning/ui';

export const RouterProvider = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/trip/:tripId" element={<TripPlanning />} /> */}
            </Routes>
        </BrowserRouter>
    );
};
