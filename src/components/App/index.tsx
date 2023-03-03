import React from 'react'
import { Main } from '../Main'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { PostPage } from '../PostPage'


export const App = () => {
  return (
  <HashRouter>
    <Routes>
      <Route path=':id' element={<PostPage />}/>
      <Route path='/' element={<Main />}/>
    </Routes>
  </HashRouter>
  )
}
