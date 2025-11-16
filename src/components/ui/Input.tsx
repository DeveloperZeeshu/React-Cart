import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    className?: string
    placeholder?: string
    type?: string
    w?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    type = 'text',
    label = '',
    placeholder = '',
    className = '',
    w = 'w-full',
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className={`${w}`}>
            {label && (
                <label
                    className="block mb-1 text-sm font-medium text-gray-700"
                    htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                id={id}
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={`border bg-white border-gray-300 rounded-lg h-11 px-4 py-2.5 ${className}`}
                {...props}
            />
        </div>
    )
})

export default Input

