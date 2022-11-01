import { ICartItem } from "../@types/pizza";

export const getLSCart = () => {
    const data = localStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        items,
        totalPrice,
    };
};

export const calcTotalPrice = (items: ICartItem[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
    }, 0);
};
