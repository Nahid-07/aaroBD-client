import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalAmount: 0,
  totalQuantity: 0,
};

const updateTotals = (state) => {
  state.totalQuantity = state.cartItems.reduce((sum, i) => sum + i.quantity, 0);
  state.totalAmount = state.cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // 🔑 Generate a unique ID for this specific variant
      const cartId = `${item._id}-${item.size}-${item.color}`;

      const exist = state.cartItems.find((x) => x.cartId === cartId);

      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({
          ...item,
          cartId, // Save the unique ID
          quantity: 1,
        });
      }
      updateTotals(state);
    },

    removeFromCart: (state, action) => {
      // Now we remove by cartId, not just product _id
      state.cartItems = state.cartItems.filter(
        (x) => x.cartId !== action.payload
      );
      updateTotals(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x.cartId === action.payload);
      if (item) item.quantity += 1;
      updateTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x.cartId === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      updateTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
