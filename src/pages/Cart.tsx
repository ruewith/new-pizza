import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ICartItem } from "../@types/pizza";
import CartEmpty from "../components/cart-empty";
import CartItem from "../components/cart-item";

import { ArrowBack, CartIcon, Trash } from "../components/svg";
import { cartSelector } from "../selectors";
import { clearItems } from "../store/cartSlice";

const Cart: FC = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector(cartSelector);

    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

    const clearCartHandler = () => {
        dispatch(clearItems());
    };

    if (!totalCount) {
        return <CartEmpty />;
    }

    return (
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        <CartIcon />
                        Корзина
                    </h2>
                    <div onClick={clearCartHandler} className="cart__clear">
                        <Trash />
                        <span>Очистить корзину</span>
                    </div>
                </div>
                <div className="cart-list">
                    {items.map((item: any) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span>
                            Всего пицц: <b>{totalCount} шт.</b>
                        </span>
                        <span>
                            Сумма заказа: <b>{totalPrice} ₽</b>
                        </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to="/" className="button button--outline button--add go-back-btn">
                            <ArrowBack />
                            <span>Вернуться назад</span>
                        </Link>
                        <div className="button pay-btn">
                            <span>Оплатить сейчас</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
