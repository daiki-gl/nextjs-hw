import Button from "../atoms/Button";
import ModalBody from "../atoms/ModalBody";
import ModalHeader from "../atoms/ModalHeader";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({isOpen, onClose}: ModalProps) {
    // closeの時はnullを返す
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 bg-white bg-opacity-50 shadow-sm`}>
            <div className="fixed inset-0 flex items-center justify-center bg-white">
                <div className="relative w-full max-w-md bg-white rounded-md">
                    <ModalHeader />
                    <ModalBody />
                    <div className="p-4 pt-0">
                        <Button text="閉じる" onClick={onClose} />
                    </div>
                </div>
            </div>
        </div>
    )
}