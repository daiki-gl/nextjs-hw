'use client'
import useNotBrowserBack from "@/app/common/hooks/useNotBrowserBack"
import AddUserList from "../organisms/AddUserList"

const AddTemplate = () => {
  useNotBrowserBack('/add')
  return (
        <div>
            <main className="w-full">
                <AddUserList />
            </main>
        </div>
  )
}

export default AddTemplate