import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';


const store = configureStore({
  reducer: { counter: cartSlice.reducer}  //Behind the scene, it will merge all the reducer into one big reducer
});

export const cartActions = cartSlice.actions;

export default store;