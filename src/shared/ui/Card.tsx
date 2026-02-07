import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hover: boolean;
}

export const Card = ({ children, hover = false, className = '', ...props }: CardProps) => {
    const hoverStyles = hover ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : '';

    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-gray-200 ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}