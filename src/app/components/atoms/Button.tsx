import { ButtonProps } from "@/app/common/types";

export default function Button({ text, onClick, disabled = false, outline = false, noDeco = false, type = "button" }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer  
                ${outline ? 'outline-1 w-48 text-left flex-1/2' : ''}
                ${noDeco ? 'text-blue-500 hover:text-gray-300 underline inline-block mr-20 text-left hover:!bg-transparent' : ''}
                ${outline == false && noDeco == false ? 'bg-blue-500 rounded-md px-4 py-2 mr-6 mt-4 text-white' : ''}
                ${disabled ? 'opacity-50 !cursor-not-allowed bg-gray-500' : 'hover:outline-white hover:bg-white hover:text-black'} 
                `}
        >
            {text}
        </button>
    )
}