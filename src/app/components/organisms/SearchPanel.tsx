'use client'
import { SetStateAction, useEffect, useState } from "react";
import Form from "../molecules/Form";
import useUserList from "@/app/common/hooks/useUserList";
import { UserData } from "@/app/common/types";
import Modal from "../molecules/Modal";
import useModal from "@/app/common/hooks/useModal";
import { useTypeContext } from "@/app/components/context/TypeContext";

export default function SearchPanel({showUserData, setShowUserData}
    : {
        showUserData: UserData[] | null; 
        setShowUserData: React.Dispatch<SetStateAction<UserData[]>>;
    }) {

    /*
    useModal モーダルの開閉の操作をするカスタムhook
    useUserList APIからユーザーの取得、ユーザーをセットするカスタムhook
    */
    const {isOpen, openModal, closeModal} = useModal();
    const {getUsersFunction,users} = useUserList();
    const [isLoading, setIsLoading] = useState(true);

    // セッションから検索タイプを取得（"list" または "detail"）して状態に保存
    const {type, setType} = useTypeContext();
        useEffect(() => {
            const storedType = sessionStorage.getItem("searchType");
            setType(storedType);
    
            if(type !== undefined || type !== null){
                setIsLoading(false)
            }
            (async () => {
            await getUsersFunction();
            })()
        }, []);

    return (
        <>
            {isLoading ? <div className="text-center my-24">Loading...</div> : (
                <div>
                    <Form type={type} showUserData={showUserData} setShowUserData={setShowUserData} userData={users} onOpen={openModal} />
                    <Modal isOpen={isOpen} onClose={closeModal} />
                </div>
            )}
        </>
    )
}