import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";



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
                if (carts[isExistIndex].quantity > item.detail.quantity) {
                    carts[isExistIndex].quantity = item.detail.quantity;
                }
            } else {
                carts.push({ quantity: item.quantity, id: item.id, detail: item.detail })
            }

            state.carts = carts;
            message.success("Sản phẩm đã được thêm vào Giỏ hàng")
        },
        doUpdateCartAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;
            let isExistIndex = carts.findIndex(c => c.id === item.id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = item.quantity;
                if (carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity) {
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
                }
            } else {
                carts.push({ quantity: item.quantity, id: item.id, detail: item.detail })
            }

            state.carts = carts;
            //message.success("Sản phẩm đã được cập nhật vào Giỏ hàng")
        },

        doDeleteItemCartAction: (state, action) => {
            state.carts = state.carts.filter(c => c.id !== action.payload.id);
        },

        doPlaceOrderAction: (state, action) => {
            state.carts = [];
        }
    },
    extraReducers: (builder) => {

    },
})

export const { doAddProductAction, doUpdateCartAction, doDeleteItemCartAction, doPlaceOrderAction } = orderSlice.actions;

export default orderSlice.reducer;