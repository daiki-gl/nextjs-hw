import { useSelectType } from "@/app/common/types";

export default function TableHeaderItem({text, isCheckBox = false, select
    }: {
        text: string,
        isCheckBox?: boolean,
        select?: useSelectType
    }) {
    return (
        <th className="text-left py-2 px-4">
            {isCheckBox ? (
                    <input 
                        type="checkbox"
                        checked={select?.selectedAll == true}
                        onChange={(e) => {
                            select?.setSelectedAll(e.target.checked)
                            select?.setSelected(
                                select?.selected.map(() => {
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