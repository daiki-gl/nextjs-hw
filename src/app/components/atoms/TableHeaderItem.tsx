import React from 'react';

export default function TableHeaderItem({ text, className = '' }: { text: string; className?: string }) {
    return (
        <th className={`text-center py-2 px-4 border border-gray-300 ${className}`}>
            {text}
        </th>
    );
}