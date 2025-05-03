'use client'
import { useShowDataContext } from "@/app/context/ShowDataContext";
import { useTypeContext } from "@/app/context/TypeContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";

export default function AddUserList(){
    const {showAddUserData} = useShowDataContext();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const {type, setType} = useTypeContext();
    useEffect(() => {
        const storedType = sessionStorage.getItem("searchType");
        setType(storedType);

        if(type !== undefined || type !== null){
            setIsLoading(false)
        }
    }, []);

    return (
        <div className="w-3/5 mx-auto my-10">
            <table className="w-full mt-5">
                    <thead>
                        <tr className="border-b-2 border-gray-300">
                            <th className="text-left py-2 px-4">名前</th>
                            <th className="text-left py-2 px-4">電話番号</th>
                            {isLoading ? <th >Loading...</th> :
                            type === "details" ? 
                                <th className="text-left py-2 px-4">金額</th>
                            : 
                                <th className="text-left py-2 px-4">郵便番号</th>
                            }
                            <th className="text-left py-2 px-4">ステータス</th>
                        </tr>
                    </thead>
                    <tbody>
                            {/* チェックしたユーザー一覧をmapで表示 */}
                        {
                            showAddUserData && showAddUserData.map((user, i) => {
                                return (
                                    <tr key={i} className="border-b border-gray-300">
                                        <td className="py-2 px-4">{user.name}</td>
                                        <td className="py-2 px-4">{user.phone}</td>
                                        {isLoading ? <th >Loading...</th> :
                                            type === "details" ? 
                                            <th className="text-left py-2 px-4">{user.payment}</th>
                                        : 
                                        <td className="py-2 px-4">{user.address}</td>
                                        }
                                        <td className="py-2 px-4">{user.status ? "済" : "未"}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
            </table>
            <div className="text-center">
            <button onClick={() => router.back()} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md mx-10 hover:bg-blue-600">戻る</button>
            <Button text="送信" />
            </div>
        </div>
    )
}