import CartIcon from "../Cart/CartIcon.js";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/Cart-Context.js";

const HeaderCartButton = (props) => {
  let cartCtx = useContext(CartContext);
  console.log(cartCtx);
  const [btnhigh, setbtnhigh] = useState(false);
  const { item } = cartCtx;

  let u = cartCtx.item.reduce((accumalator, curr_value) => {
    return accumalator + curr_value.amount;
  }, 0);

  const btnclasses = `${classes.button} ${
    btnhigh === true ? classes.bump : ""
  }`;

  useEffect(() => {
    if (item.length === 0) {
      return;
    }
    setbtnhigh(true);

    const timercount = setTimeout(() => setbtnhigh(false), 300);
    return () => clearTimeout(timercount);
  }, [item]);

  return (
    <button className={btnclasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{u}</span>
    </button>
  );
};

export default HeaderCartButton;
