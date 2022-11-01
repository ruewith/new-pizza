import { RootState } from "../store";

export const cartSelector = (state: RootState) => state.cart;
export const cartItemsSelector = (state: RootState) => state.cart.items;

export const filterSelector = (state: RootState) => state.filter;
export const categorySelector = (state: RootState) => state.filter.category;
export const pageSelector = (state: RootState) => state.filter.page;
export const sortSelector = (state: RootState) => state.filter.sort;
export const searchSelector = (state: RootState) => state.filter.search;

export const pizzaSelector = (state: RootState) => state.pizza;
