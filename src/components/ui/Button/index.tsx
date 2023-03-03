import React from 'react'
import Styles from './styles.module.css'
interface ButtonProps {
  value: string, 
  onClick: () => void,
  disabled?: boolean

}
export const Button: React.FC<ButtonProps> = ({value, onClick, disabled}) => {
  return (
    <button className={Styles.button} onClick={onClick} disabled={disabled}>{value}</button>
  )
}
