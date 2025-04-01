'use client'
import { SetStateAction, useEffect } from "react";
import Form from "../molecules/Form";
import useUserList from "@/app/common/hooks/useUserList";
import { UserData } from "@/app/common/types";
import Modal from "../molecules/Modal";
import useModal from "@/app/common/hooks/useModal";

export default function SearchPanel({showUserData, setShowUserData}
    : {
        showUserData: UserData[] | null; 
        setShowUserData: React.Dispatch<SetStateAction<UserData[]>>;
    }) {

    const {isOpen, openModal, closeModal} = useModal();
    const {getUsersFunction,users} = useUserList();
    useEffect(() => {
        (async () => {
        await getUsersFunction();
        })()
    },[]);

    return (
        <div>
            <Form showUserData={showUserData} setShowUserData={setShowUserData} userData={users} onOpen={openModal} />
            <Modal isOpen={isOpen} onClose={closeModal} />
        </div>
    )
}