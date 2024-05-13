import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { formatUSD } from "../utils/currency-converter";

export default function Meal({ meal }) {
    const { addMealToCart } = useContext(CartContext);

    return <div className="meal-item"><article >
        <img src={`http://localhost:3000/${meal.image}`} alt="meal" />
        <div className="meal-item-description">
            <h3>{meal.name}</h3>
            <span className="meal-item-price">{formatUSD(meal.price)}</span>
            <p>{meal.description}</p>
        </div>
        <div className="meal-item-actions">
            <button className="button" type="button" onClick={() => addMealToCart(meal)}>Add to Cart</button>
        </div>
    </article></div>
}