import { useContext } from "react";
import useInput from '../hooks/useInput';
import { CartContext } from "../store/CartContext";
import { formatUSD } from "../utils/currency-converter";
import { postOrder } from "../utils/http";
import { isEmail, isNotEmpty } from "../utils/validators";
import Input from "./Input";

export default function Checkout({ onCancel, onSubmit }) {
    const { items, resetStore } = useContext(CartContext);
    const { input: fullNameInput, onChange: fullNameChange, onBlur: fullNameBlur, hasError: fullNameHasError } = useInput('', [isNotEmpty]);
    const { input: emailInput, onChange: emailChange, onBlur: emailBlur, hasError: emailHasError } = useInput('', [isNotEmpty, isEmail]);
    const { input: streetInput, onChange: streetChange, onBlur: streetBlur, hasError: streetHasError } = useInput('', [isNotEmpty]);
    const { input: postalCodeInput, onChange: postalCodeChange, onBlur: postalCodeBlur, hasError: postalCodeHasError } = useInput('', [isNotEmpty]);
    const { input: cityInput, onChange: cityChange, onBlur: cityBlur, hasError: cityHasError } = useInput('', [isNotEmpty]);

    const cartTotal = formatUSD(items.reduce((previusValue, currentValue) => {
        return previusValue + (currentValue.meal.price * currentValue.quantity);
    }, 0))

    async function handleSubmitOrder(e) {
        e.preventDefault();
        if (fullNameHasError || emailHasError || streetHasError || postalCodeHasError || cityHasError) {
            return;
        }

        const formData = new FormData(e.target);
        var formDataObj = {
            items: items.map(item => item.meal),
            customer: {}
        };
        formData.forEach((value, key) => formDataObj['customer'][key] = value);
        var json = JSON.stringify({ order: formDataObj });
        try {
            await postOrder(json);
            resetStore();
            onSubmit('ok')
        } catch (error) {
            onSubmit(error.message ? error.message : <p>An error has ocurred sending your order, please try again later.</p>)
        }
    }

    function handleReset(e) {
        onCancel();
    }

    return <form action="dialog" onSubmit={handleSubmitOrder} onReset={handleReset}>
        <h2>Checkout</h2>
        <p>Total Amount {cartTotal}
        </p>
        <Input name="name" id="full-name" label='Full Name' inputValue={fullNameInput.value} onChange={fullNameChange} onBlur={fullNameBlur} hasError={fullNameHasError} />
        <Input name="email" id="email" label='E-Mail Address' inputValue={emailInput.value} onChange={emailChange} onBlur={emailBlur} hasError={emailHasError} />
        <Input name="street" id="street" label='Street' inputValue={streetInput.value} onChange={streetChange} onBlur={streetBlur} hasError={streetHasError} />
        <div className="control-row">
            <Input name="postal-code" id="postal-code" label='Postal Code' inputValue={postalCodeInput.value} onChange={postalCodeChange} onBlur={postalCodeBlur} hasError={postalCodeHasError} />
            <Input name="city" id="city" label='City' inputValue={cityInput.value} onChange={cityChange} onBlur={cityBlur} hasError={cityHasError} />
        </div>
        <p className="modal-actions">
            <button className="text-button" type="reset">Close</button>
            <button className="button" type="submit" >Submit Order</button>
        </p>
    </form>
}