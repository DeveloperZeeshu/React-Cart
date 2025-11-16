import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    text = 'Submit',
    type = 'submit',
    className = '',
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            className={`px-4 py-2.5 text-white rounded-lg hover:bg-gray-800 bg-black ${className}`}
            {...props}>
            {text}
        </button>
    )
})

export default Button

