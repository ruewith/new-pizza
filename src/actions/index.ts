import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPizzaItem } from "../@types/pizza";

import { pizzaAPI, FetchPizzaArgs } from "../api";

export const fetchPizzas = createAsyncThunk<IPizzaItem[], FetchPizzaArgs>("pizzas/fetchPizzas", async (params) => {
    const { data } = await pizzaAPI.getItems(params);
    return data;
});
