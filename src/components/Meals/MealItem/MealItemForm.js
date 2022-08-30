import React, { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";


const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id, //to make an unique id
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  );
};

export default MealItemForm;

//we use forwardRef in Input.js, so that it acts as an argument here

//amountInputRef.curent will point at the input element which is stored in that ref in the end. and then every input element by default has a value property which holds the currently entered value which is a string even for the number.

//to convert it to a number, we add a + sign infront of the enteredAmount



//check whether amount added is valid or not, for a single item/dish, we can maximum order 5. // to check this we use useState
//if amountIsValid is false, then show the paragraph