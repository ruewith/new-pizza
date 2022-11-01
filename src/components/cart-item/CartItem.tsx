import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { ICartItem } from "../../@types/pizza";
import { addItem, minusItem, removeItem } from "../../store/cartSlice";

import { Minus, Plus } from "../svg";

const CartItem: FC<ICartItem> = (props) => {
    const { id, title, type, size, price, count, imageUrl } = props;
    const dispatch = useDispatch();

    const incItem = () => {
        dispatch(addItem({ id } as ICartItem));
    };

    const decrItem = () => {
        dispatch(minusItem(id));
    };
    const delItem = () => {
        dispatch(removeItem(id));
    };

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>
                    {type}, {size} см.
                </p>
            </div>
            <div className="cart__item-count">
                <button
                    disabled={count === 1}
                    onClick={decrItem}
                    className="button button--outline button--circle cart__item-count-minus"
                >
                    <Minus />
                </button>
                <b>{count}</b>
                <button onClick={incItem} className="button button--outline button--circle cart__item-count-plus">
                    <Plus />
                </button>
            </div>
            <div className="cart__item-price">
                <b>{price * count} ₽</b>
            </div>
            <div className="cart__item-remove">
                <div onClick={delItem} className="button button--outline button--circle">
                    <Plus />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
