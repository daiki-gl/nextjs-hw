'use client'
import { usePreventBrowserBack } from "@/app/common/hooks/usePreventBrowserBack"
import AddUserList from "../organisms/AddUserList"

const AddTemplate = () => {
  usePreventBrowserBack();
  return (
        <div>
            <main className="w-full">
                <AddUserList />
            </main>
        </div>
  )
}

export default AddTemplate