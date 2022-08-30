import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    //post formdetails as well as cartitems to firebase
    await fetch(
      "https://react-food-order-app-71af6-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    //once form is submitted we want to get the inputs blank and show success message of ordered, also we want the cart to get cleared
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  //main jsx content
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseCart}>
        Close
      </button>
    </div>
    </>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

//wrap this in an unordered list <ul>{here comes the array object}</ul>
//const cartItems = [{id: 'c1', name: 'Sushi', amount: 2, price: 12.99}].map(item => <li>{item.name}</li>);

//props.onCloseCart is from App.js

//the Checkout form should only show up when we click the order button
//for that we put an onClick event on order button, and to apply the showing and not showing onclick, we have to use useState hook

/* {!isSubmitting && !didSubmit && cartModalContent} 
means if not submitting and not didsubmit, then show cart content

  {isSubmitting && isSubmittingModalContent}
  means if submitting, then show "sending order data"

  {!isSubmitting && didSubmit && didSubmitModalContent}
  means when successfully submitted & order data sended, then show "successfully ordered"
*/
