import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pizzaAPI } from "../api";
import { IPizzaItem } from "../@types/pizza";

const SinglePizza: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [pizza, setPizza] = useState<IPizzaItem>();

    useEffect(() => {
        const getPizzaData = async () => {
            try {
                if (id) {
                    const { data } = await pizzaAPI.getItemById(id);
                    setPizza(data);
                }
            } catch (error) {
                alert("Ошибка при получении данных!");
                navigate("/");
            }
        };
        getPizzaData();
    }, []);

    if (!pizza) {
        return (
            <div className="container">
                <p>loading...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>{pizza.title}</h2>
            <div style={{ width: 350 }}>
                <img src={pizza.imageUrl} alt={pizza.title} />
            </div>
            <h3>{pizza.price} ₽</h3>
        </div>
    );
};

export default SinglePizza;
