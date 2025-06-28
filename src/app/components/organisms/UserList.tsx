'use client';
import { SetStateAction, useEffect, useMemo, useState } from "react";
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
   const {setShowAddUserData} = useShowDataContext();
   const {searchResult} = useSearchResultContext();
   const {selected, toggleUserSelection, toggleSelectAllCurrentPage} = useSelected(searchResult);

   const {openModal, closeModal, isOpen} = useModal();
   const [userDetails, setUserDetails] = useState<UserData>();
   const router = useRouter();
   const {isFormErr} = useIsFormErrContext();

   // 現在のページの「全選択」の状態を UserList で計算
   const selectedAllCurrentPage = useMemo(() => {
    if(!showUserData || showUserData.length === 0) {
        return false
    }
    const validUsersForCheck = showUserData.filter(user => user.status === false);
    if(validUsersForCheck.length === 0) {
        return false;
    }
    return validUsersForCheck.every(user => selected[user.id]);
   },[showUserData,selected])

   const validUsers = showUserData?.filter(user => user.status === false) || [];


   // selected オブジェクト全体を見て、true が一つでもあれば有効
   const hasAnyItemSelected = Object.values(selected).some(isChecked => isChecked === true);
   const isDisabled = !hasAnyItemSelected || isFormErr;

   const startIndex = 0 // 1ページ目の開始インデックス
   const endIndex = startIndex + 10 // 1ページ目の終了インデックス

   useEffect(() => {
    if(searchResult && searchResult.length > 0 && showUserData?.length === 0) {
        setShowUserData(searchResult.slice(startIndex, endIndex));
    } else if(searchResult && searchResult.length === 0) {
        setShowUserData([]);
    }
   },[searchResult,startIndex,endIndex])



    // handleAddUser (選択されたユーザーを add ページに持っていくための関数)
    const handleAddUserToPage = () => {
        const selectedUsers = searchResult?.filter(user => selected[user.id]) || [];
        setShowAddUserData(selectedUsers)
        router.push('/add');
    }

    const fetchUserData = (id: number): UserData | undefined => {
        return searchResult?.find((user) => user.id === id);
    }
        
    return (
        <div className="w-3/5 mx-auto my-10">
            <h1 className="text-2xl font-bold">検索結果 *{searchResult && searchResult.length}件</h1>

             <table className="w-full mt-5 border-collapse border border-gray-300">
            <TableHeader
                select={{
                    selectedAll: selectedAllCurrentPage, 
                    setSelectedAll: (checked: boolean) => toggleSelectAllCurrentPage(checked, validUsers), 
                    selected: selected, 
                }}
            />
            <TableBody
                showUserData={showUserData}
                selected={selected} 
                setSelected={toggleUserSelection} 
                modalData={{openModal,closeModal}}
                setUserDetails={setUserDetails}
                fetchUserData={fetchUserData}
            />
        </table>


            {/* isOpenの時ユーザーの詳細情報の表示 */}
            {isOpen && userDetails && (
                <>
                <div className="fixed w-screen h-screen top-0 left-0 bg-white opacity-70"></div>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-200 p-5 rounded shadow-xl">
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
                        onClick={handleAddUserToPage}
                    >追加</button>
                </div>
        </div>
    )
}