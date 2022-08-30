import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";


const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    //cleanup func
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span>Cart</span>
      <span className={classes.icon}>
        <i className="fa-solid fa-cart-shopping"></i>
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

//now the headercartbutton component will be re-evaluated by react whenevr the context changes, and it ofcourse changes when we do update it in the cartprovider component

//.reduce method allows us to transofrm an array into a single value
//it takes two arguments: first the func and second the starting value
