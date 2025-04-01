import { ButtonProps } from "@/app/common/types";

export default function Button({ text, onClick, disabled = false, outline = false, noDeco = false }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer  
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
                ${outline ? 'outline-1 w-48 text-left flex-1/2 hover:outline-white hover:bg-white hover:text-black' : ''}
                ${noDeco ? 'text-blue-500 hover:text-gray-300 underline inline-block mr-20 text-left' : ''}
                ${outline == false && noDeco == false ? 'bg-blue-500 rounded-md px-4 py-2 mr-6 mt-4 text-white' : ''}
                `}
        >
            {text}
        </button>
    )
}