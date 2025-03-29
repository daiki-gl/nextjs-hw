import { Dispatch, SetStateAction } from "react";

export default function Input({index, selected, setSelected }: {index:number, selected: boolean[]; setSelected: Dispatch<SetStateAction<boolean[]>> }) {
    return (
        <input  type="checkbox" 
                checked={selected[index]}
                onChange={(e) => {
                    const newSelected = [...selected];
                    newSelected[index] = e.target.checked;
                    setSelected(newSelected);
                }}
        />
    )
}   