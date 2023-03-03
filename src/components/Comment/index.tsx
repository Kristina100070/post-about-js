import React from 'react'
import Styles from './styles.module.css'

interface CommentProps {
  item: {
    name: string,
    email: string,
    body: string,
    id: number,
    postId: number
  }
}

export const Comment: React.FC<CommentProps> = ({item}) => {
  return (
   <div className={Styles.container}>
    <h4>{item.name}</h4>
    <p>{item.body}</p>
    <a href={`mailto:${item.email}`}>{item.email}</a>
   </div>
  )
}


