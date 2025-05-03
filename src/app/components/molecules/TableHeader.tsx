import { UserData, useSelectType } from "@/app/common/types";
import TableHeaderItem from "../atoms/TableHeaderItem";

export default function TableHeader({select,showUserData} 
    : {
        select: useSelectType
        showUserData?: UserData[] | null
    }) {
    return (
        <thead>
            <tr className="border-b-2 border-gray-300">
                <TableHeaderItem text="チェックボックス" isCheckBox={true} select={select} showUserData={showUserData} />
                <TableHeaderItem text="名前" />
                <TableHeaderItem text="電話番号" />
                <TableHeaderItem text="住所" />
                <TableHeaderItem text="ステータス" />
            </tr>
        </thead>
    )
}