// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** api Imports
import api from '../../../services/api'
import { AppleIos } from 'mdi-material-ui'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'

import authConfig from 'src/configs/auth'


interface DataParams {
  // q: string
  // role: string
  // status: string
  // currentPlan: string
  role: string
  pageSize: number
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  
    api.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
  // const response = await api.get('/users')
  const response = await api.get(`/users?perPage=${params.pageSize}`)
  console.log(response)

  return response.data
  
    
  
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    try{
      api.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
      const response = await api.post('/users', data)
      
      dispatch(fetchData(getState().user.params))
  
      return response.data
    }
    catch(error){
      alert(error.message)
    }

    }
    
   
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    try{
      api.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    const response = await api.delete(`/users/${id}`)
    
    dispatch(fetchData(getState().user.params))

    return response.data

    }
    catch(error){
      alert(error.message)
    }
    
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUsersSlice.reducer
