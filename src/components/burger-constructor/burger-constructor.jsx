import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

function BurgerConstructor() {
  return (
    <div className={styles.constructor + " mt-25 ml-8 mr-2"}>
      <div className={styles.components_container}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Флюоресцентная булка R2-D3 (верх)"
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
        />
      </div>
      <div className={styles.components + " custom-scroll"}>
        <div className={styles.components_container + " " + "mr-2"}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Кристаллы марсианских альфа-сахаридов"
            price={762}
            thumbnail={"https://code.s3.yandex.net/react/code/core.png"}
          />
        </div>
        <div className={styles.components_container + " " + "mr-2"}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail={
              "https://code.s3.yandex.net/react/code/mineral_rings.png"
            }
          />
        </div>
        <div className={styles.components_container + " " + "mr-2"}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Сыр с астероидной плесенью"
            price={4142}
            thumbnail={"https://code.s3.yandex.net/react/code/cheese.png"}
          />
        </div>
        <div className={styles.components_container + " " + "mr-2"}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Соус фирменный Space Sauce"
            price={80}
            thumbnail={"https://code.s3.yandex.net/react/code/sauce-04.png"}
          />
        </div>
        <div className={styles.components_container + " " + "mr-2"}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={1337}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
          />
        </div>
        <div className={styles.components_container + " " + "mr-2"}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Сыр с астероидной плесенью"
            price={4142}
            thumbnail={"https://code.s3.yandex.net/react/code/cheese.png"}
          />
        </div>
      </div>
      <div className={styles.components_container}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Флюоресцентная булка R2-D3 (низ)"
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
        />
      </div>
    </div>
  );
}

export default BurgerConstructor;
