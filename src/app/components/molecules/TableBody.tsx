'use client'
import { UserData } from "@/app/common/types";
import TableItem from "../atoms/TableItem";
import { SetStateAction } from "react";
import { useShowDataContext } from "@/app/context/ShowDataContext";

export default function TableBody({showUserData,selected,setSelected, modalData, fetchUserData, setUserDetails}
    :{
        showUserData: UserData[] | null,
        selected: boolean[],
        setSelected: React.Dispatch<SetStateAction<boolean[]>>,
        modalData: {
            openModal: () => void,
            closeModal: () => void,
        },
        fetchUserData: (id: number, setUserDetails: React.Dispatch<SetStateAction<UserData | undefined>>) => void
        setUserDetails: React.Dispatch<SetStateAction<UserData | undefined>>,
    }) {

        const {showAddUserData,setShowAddUserData} = useShowDataContext();

  return (
    <tbody>
        {showUserData && showUserData.map((user:UserData, i:number) => {
            return (
                    <tr key={i} className="border-b border-gray-300">
                        <TableItem selected={selected} setSelected={setSelected} i={i} isCheckBox={true} showUserData={showUserData} showAddUser={{showAddUserData, setShowAddUserData}}/>
                        {/* ユーザーの詳細情報を表示するためのカラム */}
                        <TableItem selected={selected} setSelected={setSelected} i={i} isLink={true} openModal={modalData.openModal} fetchUserData={fetchUserData} setUserDetails={setUserDetails} id={user.id}>{user.name}</TableItem>
                        <TableItem selected={selected} setSelected={setSelected} i={i}>{user.phone}</TableItem>
                        <TableItem selected={selected} setSelected={setSelected} i={i}>{user.address}</TableItem>
                        <TableItem selected={selected} setSelected={setSelected} i={i}>{user.status == true ? "済" : "未" }</TableItem>
                    </tr>
            )
        })}
    </tbody>
    )
}