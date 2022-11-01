import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/categories";
import Sort, { sortList } from "../components/sort";
import PizzaItem from "../components/pizza-item";
import Skeleton from "../components/skeleton";
import Pagination from "../components/pagination";
import ErrorBundler from "../components/error-bundler";

import { setFilters } from "../store/filterSlice";
import { fetchPizzas } from "../actions";
import { filterSelector, pizzaSelector } from "../selectors";
import { IPizzaItem } from "../@types/pizza";
import { useAppDispatch } from "../store";
import { FetchPizzaArgs } from "../api";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { items, status } = useSelector(pizzaSelector);
    const { page, category, sort, search } = useSelector(filterSelector);
    const { sortBy, order } = sort;

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const fetchPizzasHandler = async () => {
        dispatch(fetchPizzas({ page, sortBy, order, category, search }));
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as FetchPizzaArgs;
            const sortFilter =
                sortList.find((obj) => obj.sortBy === params.sortBy && obj.order === params.order) || sort;

            dispatch(
                setFilters({
                    page: params.page,
                    category: params.category,
                    search,
                    sort: sortFilter,
                })
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzasHandler();
        }

        isSearch.current = false;

        window.scrollTo(0, 0);
    }, [page, category, sort, search]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                page,
                category,
                sortBy,
                order,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [page, category, sort]);

    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
    const pizzas = items.map((item: IPizzaItem) => <PizzaItem key={item.id} {...item} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (
                <ErrorBundler />
            ) : (
                <div className="pizza-list">{status === "loading" ? skeletons : pizzas}</div>
            )}
            <Pagination />
        </div>
    );
};

export default Home;
