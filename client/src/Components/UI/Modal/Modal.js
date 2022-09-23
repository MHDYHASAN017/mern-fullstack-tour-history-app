import React from "react";
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import "./modal.css";

const Backdrop = (props) => {
  return <div className="backdrop"></div>;
};

const ModalOverlay = ({ children , close }) => {
  return (
    <div>
      {/* <Backdrop /> */}
      <div className="content w-[90%] md:w-[70%] lg:w-[60%] text-green-900">
        <div className="text-5xl text-right mr-5">
          <span onClick={close} className="cursor-pointer">x</span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children  , close}) => {
  return (
    <div>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(<ModalOverlay close={close}>{children}</ModalOverlay>, portalElement)}
    </div>
  );
};

export default Modal;
