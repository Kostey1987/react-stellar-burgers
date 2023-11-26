import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalElement = document.getElementById("modal");

function Modal({ children, onClose }) {
  useEffect(() => {
    function onEsc(evt) {
      if (evt.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalElement
  );
}

export default Modal;
