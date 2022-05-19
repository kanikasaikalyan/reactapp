import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input.js";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amount, setamount] = useState(false);
  const amountInputRef = useRef();

  const submitHandler = () => {
    const enteredamount = amountInputRef.current.value;
    const enteredamountNumber = +enteredamount;
    if (
      enteredamount.trim().length === 0 ||
      enteredamountNumber < 1 ||
      enteredamountNumber > 5
    ) {
      setamount(true);
      return;
    }
    props.onAddtoCart(enteredamountNumber);
  };

  return (
    <section className={classes.form} id={props.id}>
      <Input
        ref={amountInputRef}
        label="Amount"
        id={props.id}
        input={{
          type: "number",
          id: "id" + props.id,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={submitHandler} className={classes.button}>
        + Add
      </button>
      {amount && <p>Set amount is not valid</p>}
    </section>
  );
};

export default MealItemForm;
