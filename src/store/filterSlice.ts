import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterState, ISortItem } from "../@types/pizza";

const initialState: IFilterState = {
    page: 1,
    category: 0,
    sort: { name: "популярности(▼)", sortBy: "rating", order: "desc" },
    search: "",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload;
        },
        setSort: (state, action: PayloadAction<ISortItem>) => {
            state.sort = action.payload;
        },
        setFilters: (state, action: PayloadAction<IFilterState>) => {
            state.page = Number(action.payload.page);
            state.category = Number(action.payload.category);
            state.sort = action.payload.sort;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
});

export const { setPage, setCategory, setSort, setFilters, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
