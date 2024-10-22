import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await axios.post('/api/login', credentials)
    Cookies.set('token', response.data.token)
    return response.data
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await axios.post('/api/logout')
    Cookies.remove('token')
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: Cookies.get('token'),
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.status = 'succeeded'
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.status = 'idle'
      })
  }
})

export const selectUser = (state) => state.auth.user

export default authSlice.reducer
