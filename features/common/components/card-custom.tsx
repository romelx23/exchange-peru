// Card.tsx
import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

const CustomCard: React.FC<CardProps> = ({
    title,
    description,
    children,
    className
}) => {
    const cardStyles = clsx(
        'bg-white shadow-lg rounded-lg p-6 border border-gray-200',
        'hover:shadow-xl transition-all',
    );

    return (
        <div className={twMerge(cardStyles, className)}>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            {description && <p className="text-gray-600 mb-4">{description}</p>}
            <div>{children}</div>
        </div>
    );
};

export default CustomCard;