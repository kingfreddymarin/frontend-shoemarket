import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], totalItems: 0 };
/*
{
  id: 'sdsd2w2',
  quantity: 1,
  name: 'Nike Airforce One',
  image: 'nike122.jpg',
  precio: 110,
  total: 110
}
*/

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct(state, action) {
      const idNewEntrie = action.payload.id;
      const itemCart = state.cart.find((item, idx) => idNewEntrie === item.id);
      if (itemCart) {
        const itemUpdated = { ...itemCart };
        const filterArray = state.cart.filter(
          (item, idx) => item.id !== itemCart.id
        );
        itemUpdated.quantity++;
        itemUpdated.total += itemUpdated.precio;
        filterArray.push(itemUpdated);
        state.cart = [...filterArray];
      } else {
        const item = { ...action.payload };
        item.total = item.precio;
        state.cart.push(item);
        state.totalItems++;
      }
    },
    deleteProduct(state, action) {
      //Se tiene que enviar el id del producto como payload
      const filterArray = state.cart.filter(
        (item, idx) => item.id !== action.payload
      );
      state.cart = filterArray;
      state.totalItems--;
    },
    reset(state) {
      state.cart = [];
      state.totalItems = 0;
    },
  },
});

export default cartSlice;
