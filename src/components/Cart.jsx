import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { formatUSD } from "../utils/currency-converter";
import CartItem from "./CartItem";

export default function Cart({ onClose, onCheckout }) {
    const { items, decreaseMealQuantity, increaseMealQuantity } = useContext(CartContext);

    const cartTotal = formatUSD(items.reduce((previusValue, currentValue) => {
        return previusValue + (currentValue.meal.price * currentValue.quantity);
    }, 0))

    return <div className="cart">
        <h2>Your cart</h2>
        <ul>
            {items.map(item => <CartItem key={item.meal.id}
                name={item.meal.name} price={item.meal.price} quantity={item.quantity}
                onIncrease={() => increaseMealQuantity(item.meal.id)} onDecrease={() => decreaseMealQuantity(item.meal.id)} />)}
        </ul>
        <p className="cart-total">
            {cartTotal}
        </p>
        <p className="modal-actions">
            <button className="text-button" onClick={onClose}>Close</button>
            {items.length > 0 ?? <button className="button" onClick={onCheckout} >Go to Checkout</button>}
        </p>
    </div>
}