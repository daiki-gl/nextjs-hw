'use client';
import useShowData from "@/app/common/hooks/useShowData";
import SearchPanel from "../organisms/SearchPanel";
import UserList from "../organisms/UserList";
import useNotBrowserBack from "@/app/common/hooks/useNotBrowserBack";
export default function SearchTemplate(){
    const {showUserData, setShowUserData} = useShowData();

    useNotBrowserBack('/search')

    return (
        <div className="">
            <SearchPanel showUserData={showUserData} setShowUserData={setShowUserData} />
            <UserList showUserData={showUserData} setShowUserData={setShowUserData}  />
        </div>
    )
}