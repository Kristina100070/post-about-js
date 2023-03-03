import React, { useEffect, useState } from 'react'
import { clearPosts, createdNewPost, getAll, getById, sortPostsID, sortPosts } from '../../store/dataSlice'
import { Button } from '../ui/Button'
import { Post } from '../Post'
import Styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Select } from '../ui/Select'
import { Input } from '../ui/Input'

export const Main = () => {

const posts = useAppSelector((state) => state.data.posts)
const status = useAppSelector((state) => state.data.status)
const dispatch = useAppDispatch()
const [value, setValue] = useState('')
const [activeLoadCount, setActiveLoadCount] = useState(10)
const [pageCount, setPageCount] = useState(1)
const [texrSerchResult, setTextSerchResult] = useState('')
const [param, setParam] = useState({limit: activeLoadCount, page: pageCount})
const [newPost, setNewPost] = useState({
  title: '', 
  body: '',
})

const searchById = (e) => {
    setValue(e.target.value)
    const postId: number = parseInt(e.target.value)
    if (postId && postId <= 100) {
      dispatch(getById(postId))
      setTextSerchResult(`id найденного поста ${postId}`)
    }
      else if (postId > 100) {
        setTextSerchResult('Статьи доступны от 1 до 100')
      }
      else if (!postId) {
        dispatch(clearPosts())
        setTextSerchResult('')
    }
}

const loadPostsHandler = (value) => {
  setParam({limit: Number(value), page: 1})
  dispatch(clearPosts())
  setActiveLoadCount(Number(value))
}

const showMore = () => {
  setPageCount((prev => prev + 1))
  setParam({limit:activeLoadCount, page: pageCount + 1})
}

const namedPost = (e) => {
  setNewPost({ ...newPost, [e.target.name]: e.target.value})
}

const createdPost = () => {
  dispatch(createdNewPost({
    title: newPost.title, 
    body: newPost.body,
    id: (new Date()).getTime(),
    userId: 1,
  }))
  reset()
 }
const reset = () => {
  setNewPost({
    title: '', 
    body: '',
  })
}
useEffect(() => {
  dispatch(getAll(param))
}, [dispatch, param])


const sortPostsIDHandler = (sort) => {
  dispatch(sortPostsID(sort))
}
const sortPostsHandler = (sort) => {
  dispatch(sortPosts(sort))
}
  return (
    <> <div className={Styles.container}>
    <div className={Styles.wrap}> 
      <h2>Создание поста</h2>
      <Input name='title' value={newPost.title} onChange={namedPost} type='text' placeholder='Название поста' autoComplete='off' />
      <Input name='body' value={newPost.body} onChange={namedPost} type='text' placeholder='Описание' autoComplete='off' />
      <Button value='Создать пост' onClick={createdPost} disabled={newPost.title === '' || newPost.body === ''}  />
    </div>

    <div className={Styles.wrap}>
    <h4>Сортировка</h4>
    <Select
        defaultValue='Сортировка' 
        onChange={sortPostsHandler} 
        options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
        ]} 
    />
     <Select
        defaultValue='Сортировка по ID' 
        onChange={sortPostsIDHandler} 
        options={[
            {value: 'up', name: 'По возрастанию ID'},
            {value: 'down', name: 'По убыванию ID'},
        ]} 
    />
      <h4>Поиск по ID</h4>
      <Input name='search' value={value} onChange={searchById} type='number' placeholder='Поиск по ID' autoComplete='off' />
      {texrSerchResult && <p>{texrSerchResult}</p>}

      <h4>Колличество постов на странице</h4>
      <Select
        defaultValue='Колличество постов на странице' 
        onChange={loadPostsHandler} 
        options={[
            {value: '10', name: '10'},
            {value: '20', name: '20'},
        ]} 
    />
    </div>
    </div>
    <h1>Посты про JS</h1>
    {status === 'success' && posts.map((post, i) => (
        <Post key={i} post={post} mainPage />
     ))}
    {status === 'loading' && <p>Загрузка...</p>} 
    {status === 'error' && <p>Что-то пошло не так...</p>} 
    {posts.length < 100 && texrSerchResult === '' && 
        <Button value='показать еще' onClick={showMore} />
    }    
   </>
  )
}

export default React.memo(Main);
