import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import specialistsSlice from './specialistsSlice'

export const auth_store = configureStore({
  reducer: {
    authStatus: authSlice,
    specialists: specialistsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof auth_store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof auth_store.dispatch