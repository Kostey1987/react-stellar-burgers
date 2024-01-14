import React, { FC, ReactNode, SyntheticEvent } from "react";
import styles from "./modal-overlay.module.css";

interface IProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<IProps> = ({ onClose, children }) => {
  // const closeModalOverlay = (evt: React.MouseEvent) => {
  //   console.log("==============================");
  //   console.log(evt);
  //   if (evt.target.classList.contains(styles.overlay)) {
  //     onClose();
  //   }
  // };

  return (
    <div className={styles.overlay} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
