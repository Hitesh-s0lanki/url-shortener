import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DialogKey = string

interface UIState {
    dialogs: Record<DialogKey, boolean>
}

const initialState: UIState = {
    dialogs: {
        open: false
    },
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openDialog(state, action: PayloadAction<DialogKey>) {
            state.dialogs[action.payload] = true
        },
        closeDialog(state, action: PayloadAction<DialogKey>) {
            state.dialogs[action.payload] = false
        },
        toggleDialog(state, action: PayloadAction<DialogKey>) {
            state.dialogs[action.payload] = !state.dialogs[action.payload]
        },
    },
})

export const { openDialog, closeDialog, toggleDialog } = uiSlice.actions
export default uiSlice.reducer
