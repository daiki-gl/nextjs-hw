import React from 'react';

export default function TableItem({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
    return (
        <td className={`text-center py-2 px-4 border border-gray-300 ${className}`}>
            {children}
        </td>
    );
}