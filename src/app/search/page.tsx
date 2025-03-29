'use client';
import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import UserList from "../ui/UserList";
import { getUsers } from "../actions/serverActions";

export interface UserData{
    name: string;
    phone: string;
    address: string;
    status: boolean;
}

export default function Search() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [userData,setUserData] = useState<UserData[] | null >(null);
    const [showUserData,setShowUserData] = useState<UserData[] | null>(null);
    const [loading, setLoading] = useState(false);

    const [selected,setSelected] = useState<boolean[]>([]);
    const [selectedAll,setSelectedAll] = useState<boolean | 'indeterminate'>(false);

    // Fetch User when loading
    useEffect(() => {
       (async () => {
       const result = await getUsers();
        setUserData(result);
       })()
    },[]);

    useEffect(() => {
        if (userData && userData.length > 0) {
            const newSelected = userData.map(() => false);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
        console.log(userData)
    }, [userData]);

    useEffect(() => {
        if (selected.every((s) => s)) {
            setSelectedAll(true)
          } else if (selected.every((s) => !s)) { 
            setSelectedAll(false)
          } else {
            setSelectedAll('indeterminate')
          }
        }, [selected])

    return (
        <div>
            <main className="w-full">
                {userData && 
                <Form setIsOpenModal={setIsOpenModal} userData={userData} setLoading={setLoading} setShowUserData={setShowUserData}/>
                }
                <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />

                <div className="w-3/5 mx-auto my-10">
                    {loading && <p>Loading...</p>}
                    {userData && showUserData && UserList({ users: showUserData,selected, setSelected,selectedAll,setSelectedAll} )}
                </div>

                <div className="w-full text-center mb-7">
                    <button
                        onClick={() => setUserData(null)}
                        className="mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:bg-blue-200 disabled:cursor-not-allowed">閉じる</button>
                    <button onClick={() =>console.log('hello')} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:bg-blue-200 disabled:cursor-not-allowed" 
                        disabled={!userData}>追加</button>
                </div>
            </main>
        </div>
    )
}