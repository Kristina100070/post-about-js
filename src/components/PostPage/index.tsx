import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getById, getCommentsByPostId } from '../../store/dataSlice'
import { Post } from '../Post'
import { Comment } from '../Comment'
import Styles from './styles.module.css'
import { Button } from '../ui/Button'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export const PostPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const posts = useAppSelector((state) => state.data.posts)
    const comments = useAppSelector((state) => state.data.comments)
    const status = useAppSelector((state) => state.data.status)
    type Params = {
        id: string
    }
    const { id } = useParams<Params>()
    
  useEffect(() => {
        const a = dispatch(getById((Number(id))))
        const b = dispatch(getCommentsByPostId(id))
        Promise.all([a, b])
  }, [dispatch, id])
    
  return (
    <div className={Styles.container}>
      <Button value='На главную' onClick={() => navigate(-1)} />
      {status === 'success' && posts.map((post, i) => (
          <Post key={i} post={post} mainPage={undefined} />
      ))}
      <h4>Комментарии</h4>
      {status === 'success' && comments.map((item, i) => (
          <Comment item={item} key={i} />
      ))}
      {status === 'loading' && <p>Загрузка...</p>} 
      {status === 'error' && <p>Что-то пошло не так...</p>}  
   </div>
  )
}
