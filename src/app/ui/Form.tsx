import { UserData } from "../search/page";

export default function Form({setIsOpenModal,userData, setLoading, setShowUserData}: {
    setIsOpenModal: (isOpen : boolean) => void, 
    userData: UserData[], 
    setLoading: (loading: boolean) => void,
    setShowUserData: React.Dispatch<React.SetStateAction<UserData[] | null>>
}) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const form = event.currentTarget;
        const nameInput = form.elements.namedItem('name') as HTMLInputElement;
        const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
        const addressInput = form.elements.namedItem('address') as HTMLInputElement;
        const nameValue = nameInput.value;
        const phoneValue = phoneInput.value;
        const addressValue = addressInput.value;

        const filteredData = userData.filter((user: UserData) => {
            const nameMatch = user.name.includes(nameValue);
            const phoneMatch = user.phone.includes(phoneValue);
            const addressMatch = user.address.includes(addressValue);
            return nameMatch && phoneMatch && addressMatch;
        });
        setShowUserData(filteredData);
        setLoading(false);
    }

    return (
        <div className="mx-auto w-3/5">
            <form onSubmit={handleSubmit} className="flex justify-between flex-wrap" action='/search' method="get">
                <div className="mt-10 flex-1/2">
                    <label className="inline-block mr-7 w-20" htmlFor="name">名前</label>
                    <input className="outline-1 mr-20 w-48" type="text" id="name" name="name" placeholder="名前入力欄" />
                </div>
                <div className="mt-10 flex-1/2">
                    <label className="mr-7 w-20" htmlFor="phone">電話番号</label>
                    <input className="outline-1 w-48" type="text" id="phone" name="phone" placeholder="電話番号入力欄" />
                </div>
                <div className="mt-10 flex-1/2">
                    <label className="inline-block mr-7 w-20" htmlFor="address">郵便番号</label>
                    <input className="outline-1 w-48" type="text" id="address" name="address" placeholder="郵便番号入力欄" />
                </div>
                <div className="mt-10 flex-1/2">
                    <button onClick={(event)=> {
                        event.preventDefault()
                        setIsOpenModal(true)
                        }} className="text-white hover:text-gray-300 cursor-pointer inline-block mr-16 text-left">help</button>
                    <button className="outline-1 w-48 cursor-pointer text-left flex-1/2">検索</button>
                </div>
            </form>
        </div>
    )
}