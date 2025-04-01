import { useSelectType } from "@/app/common/types";
import TableHeaderItem from "../atoms/TableHeaderItem";

export default function TableHeader({select} 
    : {
        select: useSelectType
    }) {
    return (
        <thead>
            <tr className="border-b-2 border-gray-300">
                <TableHeaderItem text="チェックボックス" isCheckBox={true} select={select} />
                <TableHeaderItem text="名前" />
                <TableHeaderItem text="電話番号" />
                <TableHeaderItem text="住所" />
                <TableHeaderItem text="ステータス" />
            </tr>
        </thead>
    )
}