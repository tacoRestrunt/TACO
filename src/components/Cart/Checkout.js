import React, { Fragment, useState, useRef } from "react";
import Modal from "../UI/Modal";
import style from "./Checkout.module.css";
import Cart from "./Cart";

const isEmpty = (value) => value.trim() === "";
const Checkout = (props) => {
  const [backToCart, setBackToCart] = useState(false);
  const [formValid, setFormValid] = useState({
    name: true,
    city: true,
    street: true,
  });
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const cityIsValid = !isEmpty(enteredCity);
    const streetIsValid = !isEmpty(enteredStreet);

    setFormValid({
      name: nameIsValid,
      city: cityIsValid,
      street: streetIsValid,
    });
    const formIsValid = nameIsValid && cityIsValid && streetIsValid;
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
    });
  };
  const CancelHandler = () => {
    setBackToCart(true);
  };
  const invalidName = formValid.name ? "" : style.invalid;
  const invalidCity = formValid.city ? "" : style.invalid;
  const invalidStreet = formValid.street ? "" : style.invalid;
  const showCheckout = (
    <Modal>
      <form onSubmit={submitHandler}>
        <div className={`${style.control} ${invalidName}`}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formValid.name && <p>Enter your name please </p>}
        </div>
        <div className={`${style.control} ${invalidCity}`}>
          <label htmlFor="city">Your City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formValid.city && <p>Enter your city please </p>}
        </div>
        <div className={`${style.control} ${invalidStreet}`}>
          <label htmlFor="street">street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formValid.street && <p>Enter your street please </p>}
        </div>
        <div className={style.actions}>
          <button type="button" onClick={CancelHandler}>
            Cancel
          </button>
          <button className={style.submit}>Confirm</button>
        </div>
      </form>
    </Modal>
  );
  return (
    <Fragment>
      {!backToCart && showCheckout}
      {backToCart && <Cart />}
    </Fragment>
  );
};
export default Checkout;
