import React from 'react'
import Styles from './styles.module.css'

interface InputProps {
  value: string, 
  onChange: (string) => void,
  type: string
  placeholder: string
  name: string,
  autoComplete: string
}
export const Input: React.FC<InputProps> = ({value, onChange, type, placeholder, name}) => {
  return (
    <input name={name} className={Styles.input} type={type} onChange={onChange} value={value} placeholder={placeholder} />
  )
}
