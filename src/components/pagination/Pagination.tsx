import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import "./Pagination.sass";

import { setPage } from "../../store/filterSlice";
import { pageSelector } from "../../selectors";

const Pagination: FC = () => {
    const dispatch = useDispatch();
    const page = useSelector(pageSelector);

    return (
        <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => dispatch(setPage(event.selected + 1))}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={page - 1}
        />
    );
};

export default Pagination;
