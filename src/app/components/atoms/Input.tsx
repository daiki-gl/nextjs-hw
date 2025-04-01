export default function Input({name, type,children, placeholder}:{name:string, type: string, children: React.ReactNode, placeholder: string}) {
    return (
        <div className="mt-10 flex-1/2">
            <label className="inline-block mr-7 w-20" htmlFor={name}>{children}</label>
            <input className="outline-1 mr-20 w-48" type={type} id={name} name={name} placeholder={placeholder} />
        </div>
    )
}