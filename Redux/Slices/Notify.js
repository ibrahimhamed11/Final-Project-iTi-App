import { createSlice } from '@reduxjs/toolkit';

const Notify = createSlice({
    name: 'notificationCount',
    initialState: {
        notification: 0,
    },
    reducers: {
        increment: (state, action) => {
            state.notification += 1;
        },
        decrement: (state) => {
            if (state.notification > 0) {
                state.notification -= 1;
            }
        },
        reset: (state) => {
            state.notification = 0;
        },
    },
});

export const { increment, decrement, reset } = Notify.actions;

export default Notify.reducer;
