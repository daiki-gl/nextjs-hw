'use client';
import { SetStateAction, useEffect, useState } from "react";
import { UserData } from "../../common/types";
import useSelected from "@/app/common/hooks/useSelected";
import TableHeader from "../molecules/TableHeader";
import TableBody from "../molecules/TableBody";
import Button from "../atoms/Button";
import useModal from "@/app/common/hooks/useModal";
import { useRouter } from "next/navigation";
import { useShowDataContext } from "@/app/context/ShowDataContext";
import { useSearchResultContext } from "@/app/context/SearchResultContext";
import { useIsFormErrContext } from "@/app/context/IsFormErrContext";
import Pagenation from "../molecules/Pagenation";


export default function UserList({showUserData, setShowUserData}
    :{
        showUserData: UserData[] | null; 
        setShowUserData: React.Dispatch<SetStateAction<UserData[]>>;
    } ) {
    /*
     useSelected チェックボックスのchecked/uncheckedの操作するカスタムhook
     useModal モーダルの開閉の操作をするカスタムhook
     userDetails/setUserDetails ユーザーの詳細情報を保持、setする関数
    */
   const {showAddUserData} = useShowDataContext();
   const {selected,selectedAll,setSelected,setSelectedAll, fetchUserData} = useSelected(showUserData, showAddUserData);
   const {openModal, closeModal, isOpen} = useModal();
   const [userDetails, setUserDetails] = useState<UserData>();
   const router = useRouter();
   const {searchResult} = useSearchResultContext();
   const {isFormErr} = useIsFormErrContext();

   const isDisabled = !(selected.length > 0) || !selected.some(select => select === true) || isFormErr;

   const startIndex = 0 // 1ページ目の開始インデックス
   const endIndex = startIndex + 5 // 1ページ目の終了インデックス

   useEffect(() => {
    if(searchResult && showUserData?.length === 0) {
        setShowUserData(searchResult.slice(startIndex, endIndex))
    }
   },[isFormErr])
        
    return (
        <div className="w-3/5 mx-auto my-10">
            <h1 className="text-2xl font-bold">検索結果 *{searchResult && searchResult.length}件</h1>

            {/* ユーザーの一覧表示用のテーブル */}
            <table className="w-full mt-5">
                <TableHeader select={{selectedAll,setSelectedAll,selected,setSelected}} showUserData={showUserData}  />
                <TableBody showUserData={showUserData} selected={selected} setSelected={setSelected} modalData={{openModal,closeModal}} fetchUserData={fetchUserData} setUserDetails={setUserDetails} />
            </table>

            {/* isOpenの時ユーザーの詳細情報の表示 */}
            {isOpen && userDetails && (
                <>
                <div className="fixed w-screen h-screen top-0 left-0 bg-white opacity-70"></div>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-black border-b-2 min-w-xs">詳細情報</h2>
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
                </>
            )}
            
            <div className="w-full text-center my-7">

            {/* ページネーション */}
            {searchResult && searchResult.length > 0 && (
                <Pagenation limit={10} showUserData={searchResult} setShowUserData={setShowUserData} />
            )}

                {/* 表示されているユーザーを消す */}
                    <Button text="閉じる" onClick={() => setShowUserData([])} />
                {/* ユーザーの追加ボタン */}
                    <button 
                        disabled={isDisabled} 
                        className={`cursor-pointer bg-blue-500 rounded-md px-4 py-2 mr-6 mt-4 text-white  
                            ${isDisabled
                            ? 'bg-gray-400 !cursor-not-allowed opacity-50' : 'bg-blue-500 text-white'}`}
                        onClick={() => router.push('/add')}
                    >追加</button>
                </div>
        </div>
    )
}