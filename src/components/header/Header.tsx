import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import "./Header.sass";

import logoSvg from "../../assets/img/pizza-logo.svg";
import { CartIcon } from "../svg";

import Search from "../search";

import { cartSelector } from "../../selectors";

const Header = () => {
    const { totalPrice, items } = useSelector(cartSelector);
    const { pathname } = useLocation();

    const isMounted = useRef(false);

    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items);
            localStorage.setItem("cart", json);
        }
        isMounted.current = true;
    }, [items]);

    return (
        <div className="header">
            <Link to="/">
                <div className="header__logo">
                    <img width="38" src={logoSvg} alt="Pizza logo" />
                    <div>
                        <h1>React Pizza V2</h1>
                        <p>самая вкусная пицца во вселенной</p>
                    </div>
                </div>
            </Link>
            <Search />
            <div className="header__cart">
                {pathname !== "/cart" && (
                    <Link to="/cart" className="button button--cart">
                        <span>{totalPrice} ₽</span>
                        <div className="button__delimiter"></div>
                        <CartIcon />
                        <span>{totalCount}</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
