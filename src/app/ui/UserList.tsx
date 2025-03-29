import { UserData } from "../search/page";

export default function UserList({ users, selected, setSelected,selectedAll,setSelectedAll } 
    :{users:UserData[]; 
        selected:boolean[]; 
        setSelected: (selected: boolean[]) => void;
        selectedAll: boolean | 'indeterminate';
        setSelectedAll: React.Dispatch<React.SetStateAction<boolean | "indeterminate">>
    }) {
    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">検索結果 *{users.length}件</h1>
            <table className="w-full mt-5">
                <thead>
                    <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-4">
                        <input 
                            type="checkbox" 
                            checked={selectedAll == true}
                            onChange={(e) => {
                                setSelectedAll(e.target.checked)
                                setSelected(
                                    selected.map(() => {
                                      return e.target.checked;
                                    })
                                  )
                            }}
                        />
                    </th>
                        <th className="text-left py-2 px-4">名前</th>
                        <th className="text-left py-2 px-4">電話番号</th>
                        <th className="text-left py-2 px-4">郵便番号</th>
                        <th className="text-left py-2 px-4">ステータス</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user:UserData, i:number) => {
                        return (
                            <tr key={i} className="border-b border-gray-300">
                                <td className="py-2 px-4">

                                    <input 
                                    type="checkbox" 
                                    checked={selected[i] || false}
                                        onChange={(e) => {
                                            const newSelected = [...selected];
                                            newSelected[i] = e.target.checked;
                                            setSelected(newSelected);
                                        }}
                                    />

                                </td>
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.phone}</td>
                                <td className="py-2 px-4">{user.address}</td>
                                <td className="py-2 px-4">{user.status == true ? "済" : "未" }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}