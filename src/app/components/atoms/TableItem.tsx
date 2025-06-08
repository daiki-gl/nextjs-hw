import React from 'react';

export default function TableItem({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
    return (
        <td className={`py-2 px-4 ${className}`}>
            {children}
        </td>
    );
}