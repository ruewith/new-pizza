import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./PizzaItem.sass";
import { Plus } from "../svg";

import { addItem } from "../../store/cartSlice";
import { cartItemsSelector } from "../../selectors";
import { ICartItem, IPizzaItem } from "../../@types/pizza";

const PizzaItem: FC<IPizzaItem> = (item) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(cartItemsSelector);

    const { id, title, price, imageUrl, types, sizes } = item;
    const typeNames: string[] = ["тонкое", "традиционное"];

    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const countItems = cartItems.find((obj: any) => obj.id === id);

    const count = countItems ? countItems.count : 0;

    const addItemHandler = () => {
        const item: ICartItem = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            count: 0,
        };
        dispatch(addItem(item));
    };

    return (
        <div className="pizza-wrapper">
            <div className="pizza-item">
                <Link to={`/pizza/${id}`}>
                    <img className="pizza-item__image" src={imageUrl} alt="Pizza" />
                </Link>
                <h4 className="pizza-item__title">{title}</h4>
                <div className="pizza-item__selector">
                    <ul>
                        {types.map((type: any, index: any) => (
                            <li
                                onClick={() => setActiveType(index)}
                                key={type}
                                className={activeType === index ? "active" : ""}
                            >
                                {typeNames[type]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((size: any, index: any) => (
                            <li
                                onClick={() => setActiveSize(index)}
                                className={activeSize === index ? "active" : ""}
                                key={size}
                            >
                                {size} см.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-item__bottom">
                    <div className="pizza-item__price">от {price} ₽</div>
                    <button onClick={addItemHandler} className="button button--outline button--add">
                        <Plus />
                        <span>Добавить</span>
                        {count > 0 && <i>{count}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaItem;
