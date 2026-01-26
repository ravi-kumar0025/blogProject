import React, { useId } from 'react'

const Select = React.forwardRef(function Select(ref,{
    label = "select",
    options,
    className,
    ...props
}) {
    const id = useId();
    return (
        <div>
            {label && <label className=' '>{label}</label>}
            <select {...props} ref={ref} id={id}
                className={`w-full px-3 rounded-lg py-2 border border-gray-300 outline-none
        focus:border-blue-500 duration-200 ${className}`}>
                {options?.map((option) => (
                    <option value={options} key={options}>{option}</option>
                ))}
            </select>
        </div>
    )
});

export default Select
