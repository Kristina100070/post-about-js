import React, { useState } from 'react'

interface SelectProps {
    defaultValue: string,
    onChange: (string) => void,
    options: {name: string, value: string}[]

}
export const Select: React.FC<SelectProps> = ({defaultValue, onChange, options, //value
}) => {
    const [selectedSort, setSelectedSort] = useState('')
    const onChangeValue = (e) => {
        setSelectedSort(e.target.value)
        onChange(e.target.value)
    }
  return (
    <select value={selectedSort} onChange={onChangeValue}>
        <option disabled value=''>{defaultValue}</option>
        {options.map(option => 
            <option value={option.value} key={option.value}>
                {option.name}
            </option>)}
    </select>
  )
}
