import { UserData } from "@/app/common/types";
import { SetStateAction } from "react";

export default function TableItem({selected, setSelected, isCheckBox = false, i,isLink = false, children, openModal, fetchUserData, setUserDetails, id = -1}:
    {
        selected: boolean[],
        setSelected: React.Dispatch<SetStateAction<boolean[]>>
        isCheckBox?: boolean,
        i: number,
        isLink?: boolean,
        children?: React.ReactNode,
        openModal?: () => void,
        fetchUserData?: (id: number, setUserDetails: React.Dispatch<SetStateAction<UserData | undefined>>) => void,
        setUserDetails?: React.Dispatch<SetStateAction<UserData | undefined>>,
        id?: number,
    }
) {
    return (
        <>
        {
            isLink ? (
                <td>
                <button className="py-2 px-4 cursor-pointer w-full hover:text-gray-400" 
                        onClick={() => {
                            if (fetchUserData && setUserDetails && openModal) {
                                fetchUserData(id,setUserDetails);
                                openModal();
                            }
                        }
                        }>
                            {children}
                            </button>
                </td>
            ) : (
        <td className="py-2 px-4">
            {
                isCheckBox && (
                    <input
                    type="checkbox" 
                        checked={selected[i] || false}
                            onChange={(e) => {
                                const newSelected = [...selected];
                                newSelected[i] = e.target.checked;
                                setSelected(newSelected);
                            }} />
                    )
            }
            {
                !isCheckBox && !isLink && (
                    <span>{children}</span>
                )
            }
        </td>
            )
        }
    </>
    )
}