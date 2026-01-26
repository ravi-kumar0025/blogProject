import React, { useId } from 'react'
import "../App.css"
const Input = React.forwardRef(function Input(ref,{
    label = "input",
    type = 'text',
    className,
    ...props
}) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label className='inline-block pl-1 mb-1'>
                {label}
            </label>}
            <input
                type={type}
                className={`w-full px-3 rounded-lg py-2 border border-gray-300 outline-none
                 focus:border-blue-500 duration-200 ${className}`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    )
});

export default Input
