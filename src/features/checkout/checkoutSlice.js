import { createSlice } from "@reduxjs/toolkit";

const getSavedItem = () => {
  try {
    const saved = localStorage.getItem("directBuyItem");
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error("Error reading from localStorage:", err);
    return null;
  }
};

const initialState = {
  directBuyItem: getSavedItem(),
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setDirectBuyItem: (state, action) => {
      state.directBuyItem = action.payload;
      localStorage.setItem("directBuyItem", JSON.stringify(action.payload));
    },
    clearDirectBuyItem: (state) => {
      state.directBuyItem = null;
      localStorage.removeItem("directBuyItem");
    },
  },
});

export const { setDirectBuyItem, clearDirectBuyItem } = checkoutSlice.actions;
export default checkoutSlice.reducer;
