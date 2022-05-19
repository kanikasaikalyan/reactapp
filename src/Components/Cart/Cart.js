import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import cartContext from "../../Store/Cart-Context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Success from "./Success";

const Cart = (prop) => {
  const [orderClicked, setOrderClicked] = useState(false);
  const [outcheckout, setOutCheckOut] = useState(true);
  const [success, setSuccess] = useState(false);
  const cartCtx = useContext(cartContext);

  const totalAmount = `$${cartCtx.totalAmount}`;
  const hasitems = cartCtx.totalAmount > 0 ? true : false;

  const removeitemhandler = (id) => {
    cartCtx.removeItem(id);
  };

  const additemhandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((ele) => (
        <CartItem
          key={ele.id}
          name={ele.name}
          amount={ele.amount}
          price={ele.price}
          onRemove={removeitemhandler.bind(null, ele.id)}
          onAdd={additemhandler.bind(null, ele)}
        />
      ))}
    </ul>
  );
  const getData = async (userData) => {
    await fetch(
      "https://foodapp-998c4-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          itemsOrdered: cartCtx.item,
        }),
      }
    );
    setSuccess(true);
  };

  if (success) {
    cartCtx.clearCart();
    return (
      <Modal onClose={prop.onClose}>
        <Success />
      </Modal>
    );
  }
  const orderCheck = <Checkout bringUserData={getData} />;
  const clicked = () => {
    setOrderClicked(true);
    setOutCheckOut(false);
  };
  const display_component = orderClicked ? orderCheck : cartItems;

  return (
    <Modal onClose={prop.onClose}>
      {display_component}
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={prop.onClose}>close</button>
        {hasitems && outcheckout && <button onClick={clicked}>order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
