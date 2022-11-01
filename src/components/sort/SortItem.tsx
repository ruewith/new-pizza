import React, { FC } from "react";

interface ISortProps {
    name: string;
    isActive: boolean;
    setSort: () => void;
}

const SortItem: FC<ISortProps> = (props) => {
    const { name, isActive, setSort } = props;
    return (
        <li onClick={setSort} className={isActive ? "active" : ""}>
            {name}
        </li>
    );
};

export default SortItem;
