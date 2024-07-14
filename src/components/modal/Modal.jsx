import React, { useState, useEffect } from "react";
import propTyes from "prop-types";
import "./modal.scss";
import { useRef } from "react";

const Modal = (props) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(props.active);
  }, [props.active]);
  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};


export const ModalContent = props => {
    const contentRef = useRef(null);
    const closeModal = () => {
        contentRef.current.parentNode.classList.remove("active");
        if(props.onClose) props.onClose();
    }
    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    )
}
Modal.prototype = {
  active: propTyes.bool,
  id: propTyes.string,
};

ModalContent.prototype = {
  onClose: propTyes.func
  };
export default Modal;
