interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({isOpen, onClose}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 bg-black bg-opacity-50`}>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-md p-5 bg-white rounded-md">
                    <h2 className="text-lg text-black font-bold">モーダル</h2>
                    <ul className="flex justify-end">
                        <li className="px-2 py-1 text-black text-sm rounded-md">モーダルの中見</li>
                    </ul>
                    <div className="p-4">
                        <button onClick={onClose} className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer">閉じる</button>
                    </div>
                </div>
            </div>
        </div>
    )
}