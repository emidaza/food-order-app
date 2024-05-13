import { formatUSD } from "../utils/currency-converter";

export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
    return (<li className="cart-item">
        <p>{name} - {quantity} x {formatUSD(price)}</p>
        <div className="cart-item-actions">
            <button type="button" onClick={onDecrease}>-</button>
            {quantity}
            <button type="button" onClick={onIncrease}>+</button>
        </div>
    </li>)
}