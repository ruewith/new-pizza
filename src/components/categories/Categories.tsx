import React, { FC, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWhyDidYouUpdate } from "ahooks";

import "./Categories.sass";

import { setCategory } from "../../store/filterSlice";
import { categorySelector } from "../../selectors";

const categoryItems: string[] = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

const Categories: FC = memo(() => {
    const dispatch = useDispatch();
    const category = useSelector(categorySelector);

    const setCategoryHandler = (idx: number) => {
        dispatch(setCategory(idx));
    };

    return (
        <div className="categories">
            <ul>
                {categoryItems.map((item, index) => (
                    <li
                        className={index === category ? "active" : ""}
                        onClick={() => setCategoryHandler(index)}
                        key={index}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;
