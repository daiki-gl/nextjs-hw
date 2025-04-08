'use client';
import { SetStateAction, useState } from "react";
import { UserData } from "../../common/types";
import useSelected from "@/app/common/hooks/useSelected";
import TableHeader from "../molecules/TableHeader";
import TableBody from "../molecules/TableBody";
import Button from "../atoms/Button";
import useModal from "@/app/common/hooks/useModal";


export default function UserList({showUserData, setShowUserData}
    :{
        showUserData: UserData[] | null; 
        setShowUserData: React.Dispatch<SetStateAction<UserData[]>>;
    } ) {
   const {selected,selectedAll,setSelected,setSelectedAll, fetchUserData} = useSelected(showUserData);
   const {openModal, closeModal, isOpen} = useModal();

   const [userDetails, setUserDetails] = useState<UserData>();
        
    return (
        <div className="w-3/5 mx-auto my-10">
            <h1 className="text-2xl font-bold">検索結果 *{showUserData && showUserData.length}件</h1>
            <table className="w-full mt-5">
                <TableHeader select={{selectedAll,setSelectedAll,selected,setSelected}} />
                <TableBody showUserData={showUserData} selected={selected} setSelected={setSelected} modalData={{openModal,closeModal}} fetchUserData={fetchUserData} setUserDetails={setUserDetails} />
            </table>

            {isOpen && userDetails && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-black border-b-2">詳細情報</h2>
                        <ul className="text-black">
                            <li>名前：{userDetails.name}</li>
                            <li>電話番号：{userDetails.phone}</li>
                            <li>郵便番号：{userDetails.address}</li>
                            <li>ステータス：{userDetails.status ? "済" : "未"}</li>
                            <li>支払い金額：{userDetails.payment}円</li>
                        </ul>
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={closeModal}>閉じる</button>
                    </div>
                </div>
            )}
            
            <div className="w-full text-center my-7">
                    <Button text="閉じる" onClick={() => setShowUserData([])} />
                    <Button disabled={showUserData == null || showUserData.length == 0} text="追加" />
                </div>
        </div>
    )
}