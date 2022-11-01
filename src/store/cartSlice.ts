import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, ICartState } from "../@types/pizza";
import { calcTotalPrice, getLSCart } from "../utils";

const { items, totalPrice } = getLSCart();

const initialState: ICartState = {
    count: 0,
    totalPrice,
    items,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const findItem = state.items.find((item) => item.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },

        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find((item) => item.id === action.payload);

            if (findItem && findItem.count > 0) {
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },

        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
        },

        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
