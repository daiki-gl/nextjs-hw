'use client'
import { UserData, useSelectType } from "@/app/common/types";
import { handleSetAddUserDataAll } from "@/app/common/utils/addUserAction";
import { useShowDataContext } from "@/app/context/ShowDataContext";

export default function TableHeaderItem({text, isCheckBox = false, select, showUserData
    }: {
        text: string,
        isCheckBox?: boolean,
        select?: useSelectType,
        showUserData?: UserData[] | null
    }) {
        const {setShowAddUserData} = useShowDataContext();
    return (
        <th className="text-left py-2 px-4">
            {
            /* チェックボックスの時全選択をするボタンの追加 */
            isCheckBox ? (
                    <input 
                        type="checkbox"
                        checked={select?.selectedAll == true}
                        onChange={(e) => {
                            select?.setSelectedAll(e.target.checked)
                            select?.setSelected(
                                select?.selected.map(() => {
                                    if(showUserData && showUserData.length >0 ) {
                                        handleSetAddUserDataAll(e.target.checked, setShowAddUserData, showUserData)
                                    }
                                    return e.target.checked;
                                })
                              )
                        }}
                    />
            ) : text
            }
        </th>
    )
    }