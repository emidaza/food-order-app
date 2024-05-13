import { useContext, useState } from 'react';
import LOGO from '../assets/logo.jpg';
import { CartContext } from '../store/CartContext';
import Cart from './Cart';
import Checkout from './Checkout';
import Modal from './Modal';
import Confirmation from './Confirmation';

export default function Header() {
    const { items } = useContext(CartContext);
    const [openCart, setOpenCart] = useState(false);
    const [openCheckout, setOpenCheckout] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    const submitMessage = !submitError ? <><p>Your order was submitted succesfully</p>
        <p>We will get back to you in a few minutes via email.</p></> : submitError

    function handleOpenCheckout() {
        setOpenCart(false);
        setOpenCheckout(true);
    }

    function handleSubmitCart(result) {
        if (result !== 'ok') {
            setSubmitError(result)
        }
        setOpenCheckout(false);
        setOpenConfirmation(true);
    }

    return <>
        <header id="main-header">
            <h1 id="title"><img src={LOGO} alt="LOGO" />REACTFOOD</h1>
            <button className='text-button' type='button' onClick={() => setOpenCart(true)}>Cart({items.length})</button>
        </header>
        <Modal key='cart' open={openCart}>
            <Cart onClose={() => setOpenCart(false)} onCheckout={handleOpenCheckout}></Cart>
        </Modal>

        <Modal key='checkout' open={openCheckout}>
            <Checkout onCancel={() => setOpenCheckout(false)} onSubmit={handleSubmitCart}></Checkout>
        </Modal>

        <Modal key='confirmation' open={openConfirmation}>
            <Confirmation result={!submitError ? "Success" : "Error"} resultMessage={submitMessage} onClose={() => setOpenConfirmation(false)}></Confirmation>
        </Modal>
    </>
}