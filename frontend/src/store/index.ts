import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
