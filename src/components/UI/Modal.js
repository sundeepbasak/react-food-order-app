import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

//both the components recieve props bcoz both will recieve data
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

//check index.html
const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;

//we could have done like this or use portal
/* <>
<Backdrop />
<ModalOverlay />
</> */

//ReactDOM.createPortal(child, container) has two arguments
//first is the renderable child(can be an element, component, string etc) and the container is the DOM element.
