import React, { FC } from "react";
import styles from "../feed/feed.module.css";

export const Feed: FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-large  ${styles.title} mt-10`}>
        Лента заказов
      </h2>
      <div className={styles.main}>
        <section className={styles.feed + " " + " custom-scroll"}></section>

        <section className={styles.board}>
          <div className={styles.box}>
            <div className={styles.ready}>
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              <div
                className={
                  styles.number_ready + " " + "text text_type_digits-default"
                }
              >
                034533
              </div>
            </div>
            <div className={styles.work}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <div
                className={
                  styles.number_work + " " + "text text_type_digits-default"
                }
              >
                034533
              </div>
              <div
                className={
                  styles.number_work + " " + "text text_type_digits-default"
                }
              >
                034533
              </div>
            </div>
          </div>
          <div className={styles.completed}>
            <p className="text text_type_main-medium mt-15">
              Выполнено за все время:
            </p>
            <p className={`${styles.text_box} text text_type_digits-large`}>
              32325
            </p>
          </div>
          <div className={styles.completed}>
            <p className="text text_type_main-medium mt-15">
              Выполнено за сегодня:
            </p>
            <p className={`${styles.text_box} text text_type_digits-large`}>
              32325
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Feed;
