import React, { Fragment } from "react";
import style from "./Header.module.css";
import MealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {
  return (
    <Fragment>
      <header className={style.header}>
        <h1>TacoFusion Delights</h1>
        <HeaderCartButton onOpenCart={props.onShowCart} />
      </header>
      <div className={style["main-image"]}>
        <img src={MealsImage} alt="Delusion food" />
      </div>
    </Fragment>
  );
}
export default Header;
