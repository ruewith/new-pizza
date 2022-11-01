export interface IPizzaState {
    items: IPizzaItem[];
    status: Status;
}

export interface IPizzaItem {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export interface ICartState {
    count: number;
    totalPrice: number;
    items: ICartItem[];
}

export interface ICartItem {
    id: string;
    imageUrl: string;
    title: string;
    type: string;
    size: number;
    price: number;
    count: number;
}

export interface IFilterState {
    page: number;
    category: number;
    search: string;
    sort: ISortItem;
}

export interface ISortItem {
    name: string;
    sortBy: "rating" | "title" | "price";
    order: "desc" | "asc";
}

enum SortBy {
    RATING = "rating",
    TITLE = "title",
    PRICE = "price",
}

enum Order {
    ASC = "asc",
    DESC = "desc",
}
