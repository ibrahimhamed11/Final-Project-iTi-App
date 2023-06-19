import { configureStore, createSlice } from '@reduxjs/toolkit';
import  Notify  from "./Slices/Notify"
import ProductSlice from './Slices/ProductSlice'

export const Store = configureStore({
    reducer: {
        ProductSlice,

        Notify
    }
})

