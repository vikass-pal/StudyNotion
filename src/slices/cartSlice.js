import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItems("totalItems")) : 0
};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state, value) {
            state.totalItems = value.payload;
        },
        resetCart(state) {
            state.totalItems = 0;
        }

        // write functions for add to cart
        // removeFromcart
        // resetCart
    }
})

export const { setToken, resetCart, setTotalItems } = cartSlice.actions;

export default cartSlice.reducer;
