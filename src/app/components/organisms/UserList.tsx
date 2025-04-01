'use client';
import { SetStateAction } from "react";
import { UserData } from "../../common/types";
import useSelected from "@/app/common/hooks/useSelected";
import TableHeader from "../molecules/TableHeader";
import TableBody from "../molecules/TableBody";
import Button from "../atoms/Button";


export default function UserList({showUserData, setShowUserData}
    :{
        showUserData: UserData[] | null; 
        setShowUserData: React.Dispatch<SetStateAction<UserData[]>>;
    } ) {
   const {selected,selectedAll,setSelected,setSelectedAll} = useSelected(showUserData);
        
    return (
        <div className="w-3/5 mx-auto my-10">
            <h1 className="text-2xl font-bold">検索結果 *{showUserData && showUserData.length}件</h1>
            <table className="w-full mt-5">
                <TableHeader select={{selectedAll,setSelectedAll,selected,setSelected}} />
                <TableBody showUserData={showUserData} selected={selected} setSelected={setSelected} />
            </table>
            
            <div className="w-full text-center my-7">
                    <Button text="閉じる" onClick={() => setShowUserData([])} />
                    <Button disabled={showUserData == null || showUserData.length == 0} text="追加" />
                </div>
        </div>
    )
}