import axios from "axios";
import { IPizzaItem } from "../@types/pizza";

const instance = axios.create({
    baseURL: `https://629483aea7203b3ed06a8542.mockapi.io/`,
});

export type FetchPizzaArgs = {
    page: number;
    sortBy: string;
    order: string;
    category: number;
    search: string;
};

export const pizzaAPI = {
    getItems: (params: FetchPizzaArgs) => {
        const { page, sortBy, order, category, search } = params;

        return instance.get<IPizzaItem[]>(
            `items?page=${page}&limit=4&sortBy=${sortBy}&order=${order}${category ? `&category=${category}` : ""}${
                search ? `&search=${search}` : ""
            }`
        );
    },
    getItemById(id: string) {
        return instance.get<IPizzaItem>(`items/${id}`);
    },
};
