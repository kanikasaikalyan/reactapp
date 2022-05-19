import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm.js";
import { useContext } from "react";
import cartContext from "../../../Store/Cart-Context";
const o = {
  display: "flex",
  justifyContent: "space-between",
};
const MealItem = (props) => {
  const cartctx = useContext(cartContext);

  const onAddtoCart = (amount) => {
    const itemdata = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    };
    console.log(itemdata);
    cartctx.addItem(itemdata);
  };
  return (
    <li style={o} id={"li" + props.id}>
      <div className={classes.meals}>
        <h3>{props.name}</h3>
        <div className={classes["cont"]}>
          <div>{props.description}</div>
          <div>${props.price}</div>
        </div>
        <div />
      </div>
      <MealItemForm id={props.id} onAddtoCart={onAddtoCart} />
    </li>
  );
};

export default MealItem;
