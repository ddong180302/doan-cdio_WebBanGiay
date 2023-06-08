import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
    carts: []
};


export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        doAddProductAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            let isExistIndex = carts.findIndex(c => c.id === item.id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity;
                if (carts[isExistIndex].quantity > item.quantity) {
                    carts[isExistIndex].quantity = item.quantity;
                }
            } else {
                carts.push({ quantity: item.quantity, id: item.id, detail: item.detail })
            }

            state.carts = carts;
        }
    }
})

export const { doAddProductAction } = orderSlice.actions;

export default orderSlice.reducer;