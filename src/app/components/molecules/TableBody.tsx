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
    const USERS_TO_ADD_KEY = 'usersToAdd'; 

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
        if(user.status === true) {
                return; // ステータスが true のユーザーはチェックできない
            }else {
            setSelected(userId, isChecked);
            setShowAddUserData(prev => {
                const updatedUsers = isChecked
                    ? prev?.some(u => u.id === user.id) ? prev : (prev ? [...prev, user] : [user])
                    : prev?.filter(u => u.id !== user.id) || [];
    
                // ローカルストレージに保存
                if (typeof window !== 'undefined') {
                    localStorage.setItem(USERS_TO_ADD_KEY, JSON.stringify(updatedUsers));
                }
                return updatedUsers;
            });
        }
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
                        {user.status === true ? 
                        <span></span> :
                        <input
                            type="checkbox"
                            checked={selected[user.id] || false}
                            // disabled={user.status === true}
                            onChange={(e) => handleCheckboxChange(user.id, e.target.checked, user)}
                        />
                        }
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