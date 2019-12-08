import React, { useEffect, useRef } from "react";

import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // always refer to same element. Destory markup when modal is closed. During re-renders refer to same DOM
  // element. Do no create new divs every single time
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div; // set eleRef to current div just created
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // if ueEffect returns a fucntion will run before unmount i.e when modal closes in this case
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div> {children}</div>, elRef.current);
};

export default Modal;
