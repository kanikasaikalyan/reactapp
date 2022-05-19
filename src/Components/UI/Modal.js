import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModalBody = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClose} />,
        document.getElementById("overlays")
      )}
      ;
      {ReactDOM.createPortal(
        <ModalBody>{props.children}</ModalBody>,
        document.getElementById("overlays")
      )}
      ;
    </>
  );
};

export default Modal;
