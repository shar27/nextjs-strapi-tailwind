import { createSlice } from '@reduxjs/toolkit'

const initialState = {
items: [],
};

const cartSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
      addToBasket: (state, action) => {
          state.items = [...state.items, action.payload] 
      },
      removeFromBasket: (state, action) => {},

  },
});

export const {addToBasket, removeFromBasket} = cartSlice.actions

export const selectItems = (state) => state.basket.items;

export default cartSlice.reducer