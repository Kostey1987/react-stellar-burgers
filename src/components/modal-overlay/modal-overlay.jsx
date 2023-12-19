import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ onClose, children }) {
  const closeModalOverlay = (evt) => {
    if (evt.target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModalOverlay}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
