//managing overall cart state management
import React from 'react'

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart : ()=>{}
})

export default CartContext;
//now we have to manage this context in some component with useState or useReducer, so that this context can change over time and update parts of the application over time.