import { useRef, useState } from "react";
import style from "./MealItemForm.module.css";
import Input from "../UI/Input";
function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const refInputAmount = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = refInputAmount.current.value;
    const enteredAmountNum = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNum);
  };
  return (
    <form className={style.form} onSubmit={submitHandler}>
      <Input
        ref={refInputAmount}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!amountIsValid && <p>Please enter valid amount (1-5)</p>}
    </form>
  );
}
export default MealItemForm;
