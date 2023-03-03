import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../../store/dataSlice'

import Styles from './styles.module.css'

export const Post = ({post, mainPage}) => {
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const goToPost = () => {
    if (mainPage) {
      navigate(`/${post.id}`)
    }
  }
  const deletePostHendler = () => {
    dispatch(deletePost(post.id))
    navigate(`/`)
  }
  return (
   <div className={Styles.container} onDoubleClick={goToPost}>
    <div className={Styles.content}>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      <span>{`ID поста - ${post.id}`}</span>
    </div>
   <div>
    {mainPage && <button className={Styles.button} onClick={goToPost}>открыть</button>}
    <button className={Styles.button} onClick={deletePostHendler}>удалить</button>
   </div>
   </div>
  )
}


