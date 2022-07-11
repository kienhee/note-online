import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataFromLocalStorage: [],
}

export const dataLocalSlice = createSlice({
    name: 'dataLocal',
    initialState,
    reducers: {
        createNote: (state, action) => {
            state.dataFromLocalStorage = [...state.dataFromLocalStorage, action.payload]
        },
        deleteNote: (state, action) => {
            const notes = state.dataFromLocalStorage
            let newData = notes.filter((note) => note.id !== action.payload)
            state.dataFromLocalStorage = newData
        }
        ,
        editNote: (state, action) => {
            const editnotes = state.dataFromLocalStorage
            editnotes.forEach((item) => {
                if (item.id === action.payload.id) {
                    return {
                        id: item.id = action.payload.id,
                        title: item.title = action.payload.title,
                        content: item.content = action.payload.content
                    }

                }
            })


        }
    },
})

// Action creators are generated for each case reducer function
export const { createNote, deleteNote, editNote } = dataLocalSlice.actions

export default dataLocalSlice.reducer