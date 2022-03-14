import { configureStore } from "@reduxjs/toolkit";
import basketReducer from '/pages/slices/cartSlice'
//C:\Users\Owner\strapi\frontend\pages\slices\cartSlice.js

//global store
export const store = configureStore({
    reducer: {
        basket: basketReducer,
    },
});