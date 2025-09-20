import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    // numOfItems: 0 // total items in cart
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload; // Destructure product details from the action payload
        // Check if the item already exists in the cart by comparing names
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            // If item already exists in the cart, increase its quantity
            existingItem.quantity++;
        } else {
            // If item does not exist, add it to the cart with quantity 1
            state.items.push({ name, image, cost, quantity: 1 });
        }
        // state.numOfItems++;
    },
    removeItem: (state, action) => {
        const { name, quantity } = action.payload;
        // state.numOfItems -= quantity;
        state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
        // Find the item in the cart that matches the given name
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            const differenceQuantity = quantity - itemToUpdate.quantity;
            // state.numOfItems += differenceQuantity;
            itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
