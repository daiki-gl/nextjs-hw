'use client'
import { UserData } from "@/app/common/types";
import TableItem from "../atoms/TableItem";
import { SetStateAction } from "react";
import { useShowDataContext } from "@/app/context/ShowDataContext";

interface TableBodyProps {
    showUserData: UserData[] | null;
    selected: { [userId: number]: boolean }; 
    setSelected: (userId: number, isChecked: boolean) => void; 
    modalData: {
        openModal: () => void;
        closeModal: () => void;
    };
    setUserDetails: React.Dispatch<SetStateAction<UserData | undefined>>;
    fetchUserData: (id: number) => UserData | undefined;
}

export default function TableBody({ showUserData, selected, setSelected, modalData, setUserDetails, fetchUserData }: TableBodyProps) {
    const {setShowAddUserData } = useShowDataContext();

    if (!showUserData || showUserData.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">表示するデータがありません。</td>
                </tr>
            </tbody>
        );
    }

    const handleCheckboxChange = (userId: number, isChecked: boolean, user: UserData) => {
        setSelected(userId, isChecked);
        setShowAddUserData(prev => {
            if (isChecked) {
                // チェックされたら追加 (重複チェック)
                return prev ? (prev.some(u => u.id === user.id) ? prev : [...prev, user]) : [user];
            } else {
                // チェックが外れたら削除
                return prev ? prev.filter(u => u.id !== user.id) : [];
            }
        });
    };

    const handleDetailClick = (user: UserData) => {
        // fetchUserData を呼び出し、setUserDetails にセット
        const detailUser = fetchUserData(user.id);
        setUserDetails(detailUser || undefined);
        modalData.openModal();
    };


  return (
        <tbody>
            {showUserData.map((user: UserData) => (
                <tr key={user.id} className="border-b border-gray-300">
                    <TableItem>
                        <input
                            type="checkbox"
                            checked={selected[user.id] || false}
                            onChange={(e) => handleCheckboxChange(user.id, e.target.checked, user)}
                        />
                    </TableItem>

                    <TableItem className="hover:text-gray-400 underline underline-offset-2">
                        <button 
                            className="py-2 px-4 cursor-pointer w-full text-left" 
                            onClick={() => handleDetailClick(user)}
                        >
                            {user.name}
                        </button>
                    </TableItem>

                    <TableItem>{user.phone}</TableItem>
                    <TableItem>{user.address}</TableItem>
                    <TableItem>{user.status === true ? "済" : "未"}</TableItem>
                </tr>
            ))}
        </tbody>
    );
}