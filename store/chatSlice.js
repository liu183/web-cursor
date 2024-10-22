import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { getState }) => {
    const { auth } = getState()
    const response = await axios.get('/api/messages', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    return response.data
  }
)

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { getState }) => {
    const { auth } = getState()
    const response = await axios.post('/api/messages', message, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    return response.data
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.messages = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload)
      })
  }
})

export default chatSlice.reducer
