import classes from "./input.module.css";
import React from "react";

const Input = React.forwardRef((prop, ref) => {
  return (
    <div className={classes.in}>
      <label htmlFor={prop.key}>{prop.label}</label>
      <input ref={ref} {...prop.input}></input>
    </div>
  );
});

export default Input;
