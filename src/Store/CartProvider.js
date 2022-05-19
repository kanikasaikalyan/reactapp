import CartContext from "./Cart-Context";
import { useReducer } from "react";

var defaultcartState = {
  item: [],
  totalAmount: 0,
};
let cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingitemsindex = state.item.findIndex(
      (item) => item.id === action.item.id
    );
    const existingcartitem = state.item[existingitemsindex];

    let updatedItems;

    if (existingcartitem !== undefined) {
      const updatedItem = {
        ...existingcartitem,
        amount: existingcartitem.amount + action.item.amount,
      };
      updatedItems = [...state.item];
      updatedItems[existingitemsindex] = updatedItem;
    } else {
      updatedItems = state.item.concat(action.item);
    }

    const itemdata = {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };

    return itemdata;
  }
  if (action.type === "REMOVE") {
    const existingitemsindex = state.item.findIndex(
      (item) => item.id === action.id
    );
    const existingcartitem = state.item[existingitemsindex];

    const updatedTotalAmount = state.totalAmount - existingcartitem.price;
    let updatedItems;

    if (existingcartitem.amount === 1) {
      updatedItems = state.item.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingcartitem,
        amount: existingcartitem.amount - 1,
      };
      updatedItems = [...state.item];
      updatedItems[existingitemsindex] = updatedItem;
      console.log(updatedItems);
    }
    const itemdata = {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    console.log(itemdata);

    return itemdata;
  }

  if (action.type === "CLEAR") {
    return defaultcartState;
  }
  return defaultcartState;
};

const CartProvider = (props) => {
  const [state, dispatchstate] = useReducer(cartReducer, defaultcartState);
  const addItemtoCartHandle = (item) => {
    dispatchstate({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchstate({ type: "REMOVE", id: id });
  };

  const clearCart = () => {
    dispatchstate({ type: "CLEAR" });
  };

  const cartContext = {
    item: state.item,
    totalAmount: state.totalAmount,
    addItem: addItemtoCartHandle,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
