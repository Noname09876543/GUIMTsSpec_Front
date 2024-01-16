import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  value: Boolean
}

const initialState: AuthState = {
  value: (localStorage.getItem('username') !== null) ,
}

export const authSlice = createSlice({
  name: 'auth_status',
  initialState,
  reducers: {
    setAuth: (state) => {
      state.value = true
    },
    setLogout: (state) => {
      state.value = false
    },
  },
})

export const { setAuth, setLogout } = authSlice.actions

export default authSlice.reducer