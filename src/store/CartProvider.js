import React, { useReducer } from "react";
import CartContext from "./cart-context";


//initial state used in the useReducer
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//reducer func
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  //once successfully ordered, we want the cart items to get cleared from the cart, also the clear cart should be dispatched
  if(action.type === 'CLEAR'){
    return defaultCartState;
  }

  return defaultCartState;
};

//this is the main component
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  //clear cart
  const clearCartHandler = ()=>{
    dispatchCartAction({type: 'CLEAR'});
  }

  const cartContext = {
    //this is an object
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler, //pointing to func
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

//goal of this component is to manage the cart context data and provide that context to all components that want access to it.

//passing the {props.children} between CardContext.Provider allows us to wrap any components that should get access to this context with this cartprovider component
