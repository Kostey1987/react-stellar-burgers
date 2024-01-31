import React, { FC, ReactNode, SyntheticEvent } from "react";
import styles from "./modal-overlay.module.css";

interface IProps {
  onclick: () => void;
  children: React.ReactElement;
}

const ModalOverlay: FC<IProps> = ({ onclick, children }) => {
  return (
    <div className={styles.overlay} onClick={onclick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
