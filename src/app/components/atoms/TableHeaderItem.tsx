import React from 'react';

export default function TableHeaderItem({ text, className = '' }: { text: string; className?: string }) {
    return (
        <th className={`text-left py-2 px-4 ${className}`}>
            {text}
        </th>
    );
}