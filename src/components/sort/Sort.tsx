import React, { useEffect, useRef, useState, MouseEvent, FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SortArrow } from "../svg";
import "./Sort.sass";

import { setSort } from "../../store/filterSlice";

import SortItem from "./SortItem";
import { sortSelector } from "../../selectors";

import { ISortItem } from "../../@types/pizza";

export const sortList: ISortItem[] = [
    { name: "популярности(▲)", sortBy: "rating", order: "asc" },
    { name: "популярности(▼)", sortBy: "rating", order: "desc" },
    { name: "цене(▲)", sortBy: "price", order: "asc" },
    { name: "цене(▼)", sortBy: "price", order: "desc" },
    { name: "алфавиту(▲)", sortBy: "title", order: "asc" },
    { name: "алфавиту(▼)", sortBy: "title", order: "desc" },
];

const Sort: FC = memo(() => {
    const dispatch = useDispatch();
    const sort: ISortItem = useSelector(sortSelector);

    const sortRef = useRef<HTMLInputElement>(null);
    const [visibility, setVisibility] = useState<boolean>(false);

    const sortHandler = (item: ISortItem) => {
        dispatch(setSort(item));
        setVisibility(false);
    };

    type PopupOutsdeEvent = MouseEvent & {
        path: Node[];
    };

    useEffect(() => {
        const outsideClickHandler = (event: any) => {
            const _event = event as PopupOutsdeEvent;
            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setVisibility(false);
            }
        };

        document.body.addEventListener("click", outsideClickHandler);
        return () => {
            document.body.removeEventListener("click", outsideClickHandler);
        };
    }, []);

    const sortItems = sortList.map((item) => {
        const isActive = sort.sortBy === item.sortBy && sort.order === item.order;
        return <SortItem setSort={() => sortHandler(item)} name={item.name} isActive={isActive} />;
    });

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <SortArrow />
                <b>Сортировка по:</b>
                <span onClick={() => setVisibility(!visibility)}>{sort.name}</span>
            </div>
            {visibility && (
                <div className="sort__popup">
                    <ul>{sortItems}</ul>
                </div>
            )}
        </div>
    );
});

export default Sort;
