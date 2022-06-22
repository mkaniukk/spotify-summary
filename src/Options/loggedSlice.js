import { createSlice } from '@reduxjs/toolkit'

export const loggedSlice = createSlice({
    name: 'logged',
    initialState: {
        logged: false,
    },

    reducers: {
        changeLogged: (state) => {
            if (state.logged = false)
                state.logged = true;
            else
                state.logged = true;
        }
    },
})

export const { changeLogged: changeLogged } = loggedSlice.actions

export default loggedSlice.reducer