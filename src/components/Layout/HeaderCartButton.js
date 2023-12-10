import React, { useContext, useEffect, useState } from "react";
import style from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";
function HeaderCartButton(props) {
  const [btnEffect, setBtnEffect] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((acu, item) => {
    return acu + item.amount;
  }, 0);
  const btnBump = `${style.button} ${btnEffect ? style.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnEffect(true);
    const timer = setTimeout(() => {
      setBtnEffect(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnBump} onClick={props.onOpenCart}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCartButton;
