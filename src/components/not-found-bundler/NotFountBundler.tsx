import React, { FC } from "react";

import styles from "./NotFoundBundler.module.sass";

const NotFountBundler: FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={styles.description}>К сожалени данная страница отсутствует в нашем интернет-магазине</p>
        </div>
    );
};

export default NotFountBundler;
