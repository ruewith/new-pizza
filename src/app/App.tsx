import { Routes, Route } from "react-router-dom";

import "./App.sass";

import { Main } from "../layouts";
import { Home, NotFound, Cart, SinglePizza } from "../pages";
import { FC } from "react";

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pizza/:id" element={<SinglePizza />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
