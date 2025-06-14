'use client';
import TableHeaderItem from "../atoms/TableHeaderItem";

interface TableHeaderProps {
    select: {
        selectedAll: boolean;
        setSelectedAll: (checked: boolean) => void;
        selected: { [userId: number]: boolean };
    };
}

export default function TableHeader({ select }: TableHeaderProps) {

    return (
        <thead>
            <tr className="border-b-2 border-gray-300">
                <th className="py-3 px-4 text-left">
                    <input
                        type="checkbox"
                        checked={select.selectedAll}
                        onChange={(e) => select.setSelectedAll(e.target.checked)}
                    />
                </th>
                <TableHeaderItem text="名前" />
                <TableHeaderItem text="電話番号" />
                <TableHeaderItem text="住所" /> 
                <TableHeaderItem text="ステータス" />
            </tr>
        </thead>
    );
}