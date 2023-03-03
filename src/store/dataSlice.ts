import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

type Param = {
  limit: number,
  page: number
}
export const getAll = createAsyncThunk('data/getAll', async function (param: Param) {
  
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
        _limit: param.limit,
        _page: param.page
    }
})
return response.data;
})

export const getById = createAsyncThunk('data/getById', async function (id: number) {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
  return response.data;
})
export const getCommentsByPostId = createAsyncThunk('data/getCommentsByPostId', async function (id: string) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  return response.data;
}) 

type Post = {
id: number,
title: string,
body: string,
userId: number
}
type DataState = {
  status: string,
  posts: Post[],
  comments: any[]
}
const initialState: DataState = {
  status: '',
  posts: [],
  comments: []
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    sortPostsID: (state, action: PayloadAction<string>) => {
      if (action.payload === 'down') {
        state.posts = state.posts.sort((prev, next) => next.id - prev.id)
      } else if (action.payload === 'up') {
        state.posts = state.posts.sort((prev, next) => prev.id - next.id)
      }
      return state 
    },
    sortPosts: (state, action: PayloadAction<string>) => {
        state.posts = state.posts.sort((prev, next) => prev[action.payload].localeCompare(next[action.payload]))
      return state 
    },
    clearPosts: (state) => {
      state.posts = []
      return state 
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((item) => item.id !== action.payload)
      return state 
    },
    createdNewPost: (state, action: PayloadAction<Post>) => {
      state.posts = [...state.posts, action.payload]
      return state 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action: PayloadAction<any>) => {
      state.posts = [...state.posts, ...action.payload]
      state.status = 'success'
    })
    builder.addCase(getAll.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getAll.rejected, (state) => {
      state.status = 'error'
    })
    builder.addCase(getById.fulfilled, (state, action) => {  
      state.posts = [action.payload]
      state.status = 'success'
    })
    builder.addCase(getById.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getById.rejected, (state) => {
      state.status = 'error'
    })
    builder.addCase(getCommentsByPostId.fulfilled, (state, action) => {
      state.comments = action.payload
      state.status = 'success'
    })
    builder.addCase(getCommentsByPostId.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getCommentsByPostId.rejected, (state) => {
      state.status = 'error'
    })
  },
})

export const { sortPostsID, clearPosts, deletePost, createdNewPost, sortPosts, } = dataSlice.actions

export default dataSlice.reducer