import Modal from "../UI/Modal";
import style from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { Fragment, useContext, useState } from "react";
function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItem = cartCtx.items.length > 0;
  const cartAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const requestHandler = async (userData) => {
    await fetch("https://web-meals-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        order: cartCtx.items,
      }),
    });
    setIsRequest(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartRemoveHandler.bind(null, item.id)}
          onAdd={cartAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const showCart = !isRequest && (
    <Modal onClickModal={props.onHideCart}>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={style.actions}>
        <button className={style["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItem && (
          <button className={style.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );

  const RequestData = (
    <Modal onClickModal={props.onHideCart}>
      <p>Successfully sent the order !</p>
      <div className={style.actions}>
        <button className={style.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </Modal>
  );
  return (
    <Fragment>
      {!isCheckout && showCart}
      {!isRequest && isCheckout && (
        <Checkout onConfirm={requestHandler} onCancel={props.onHideCart} />
      )}
      {isRequest && RequestData}
    </Fragment>
  );
}
export default Cart;
