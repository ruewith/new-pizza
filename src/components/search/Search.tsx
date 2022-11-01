import React, { useCallback, useState, useRef, ChangeEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { ClearIcon, SearchIcon } from "../svg";

import { setSearch } from "../../store/filterSlice";

import "./Search.sass";

const Search = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const updateSearch = useCallback(
        debounce((str) => {
            dispatch(setSearch(str));
        }, 2000),
        []
    );

    const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearch(event.target.value);
    };

    const clearHandler = (event: MouseEvent<HTMLDivElement>) => {
        setValue("");
        dispatch(setSearch(""));
        inputRef.current?.focus();
    };

    return (
        <div className="search">
            <div className="search-icon">
                <SearchIcon />
            </div>
            <input
                ref={inputRef}
                onChange={inputValueHandler}
                value={value}
                className="search-input"
                type="text"
                placeholder="Поиск..."
            />
            {value && (
                <div onClick={clearHandler} className="search-clear">
                    <ClearIcon />
                </div>
            )}
        </div>
    );
};

export default Search;
