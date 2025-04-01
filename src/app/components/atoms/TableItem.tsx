import { SetStateAction } from "react";


export default function TableItem({selected, setSelected, isCheckBox = false, i, children}:
    {
        selected: boolean[],
        setSelected: React.Dispatch<SetStateAction<boolean[]>>
        isCheckBox?: boolean,
        i: number,
        children?: React.ReactNode,
    }
) {
    return (
        <td className="py-2 px-4">
            {
                isCheckBox ? (
                    <input
                    type="checkbox" 
                        checked={selected[i] || false}
                            onChange={(e) => {
                                const newSelected = [...selected];
                                newSelected[i] = e.target.checked;
                                setSelected(newSelected);
                            }} />
                ) : (
                    children
                )
            }
        </td>
    )
}