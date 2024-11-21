// Button.tsx
import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
}

const CustomButton: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    className,
    ...props
}) => {
    const buttonStyles = clsx(
        'font-semibold rounded transition-all',
        {
            'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
            'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
            'py-1 px-3 text-sm': size === 'small',
            'py-2 px-4 text-base': size === 'medium',
            'py-3 px-6 text-lg': size === 'large',
        }
    );

    return (
        <button
            className={twMerge(buttonStyles, className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default CustomButton;