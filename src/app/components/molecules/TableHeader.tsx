'use client';
import { UserData } from "@/app/common/types";
import TableHeaderItem from "../atoms/TableHeaderItem";
import { useEffect, useMemo, useRef } from "react"; 

interface TableHeaderProps {
    select: {
        selectedAll: boolean;
        setSelectedAll: (checked: boolean) => void;
        selected: { [userId: number]: boolean };
    };
    showUserData: UserData[] | null;
}

export default function TableHeader({ select, showUserData }: TableHeaderProps) {
    // 現在のページで一部選択されているかチェック
    const isIndeterminate = useMemo(() => {
        if (!showUserData || showUserData.length === 0) return false;
        const anySelectedInCurrentPage = showUserData.some(user => select.selected[user.id]);
        const allSelectedInCurrentPage = showUserData.every(user => select.selected[user.id]);
        return anySelectedInCurrentPage && !allSelectedInCurrentPage;
    }, [showUserData, select.selected]); 

    // input要素のrefを使ってindeterminateプロパティを直接設定
    const checkboxRef = useRef<HTMLInputElement>(null);

    // selectedAll が変更されたときに indeterminate プロパティを更新
    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = isIndeterminate;
        }
    }, [isIndeterminate]);

    return (
        <thead>
            <tr className="border-b-2 border-gray-300">
                <th className="py-3 px-4 text-left">
                    <input
                        type="checkbox"
                        checked={select.selectedAll}
                        onChange={(e) => select.setSelectedAll(e.target.checked)}
                        ref={checkboxRef}
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