import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
   cartItems: [],
   cartIsEmpty: true,
   totalOfItemsInCart: 0,
   changed: false,
};

const cartSlice = createSlice({
   name: "cart",
   initialState: initialCartState,
   reducers: {
      replaceCart(state, action) {
         if (action.payload.totalOfItemsInCart > 0) state.cartIsEmpty = false;
         else state.cartIsEmpty = true;

         state.totalOfItemsInCart = action.payload.totalOfItemsInCart;
         state.cartItems = action.payload.cartItems;
      },
      addToCart(state, action) {
         const newItem = action.payload;

         if (state.cartIsEmpty) state.cartItems = [];
         const existingItem = state.cartItems.find((item) => {
            return item.id === newItem.id;
         });

         if (!existingItem) {
            state.cartItems.push({
               id: newItem.id,
               title: newItem.title,
               quantity: 1,
               price: newItem.price,
               total: newItem.price,
            });
         } else {
            existingItem.quantity++;
            existingItem.total = existingItem.quantity * newItem.price;
         }
         state.cartIsEmpty = false;
         state.totalOfItemsInCart++;
         state.changed = true;
      },
      removeOneItem(state, action) {
         const id = action.payload.id;
         const existingItem = state.cartItems.find((item) => id === item.id);

         if (existingItem.quantity === 1)
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
         else {
            existingItem.quantity--;
            existingItem.total = existingItem.total - existingItem.price;
         }

         if (state.cartItems.length === 0) state.cartIsEmpty = true;
         state.totalOfItemsInCart--;
         state.changed = true;
      },
   },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
