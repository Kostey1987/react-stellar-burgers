import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  bunSelector,
  ingredientSelector,
  clearSelector,
} from "../../services/selectors/modalSelectors";

function BurgerConstructor() {
  const dispatch = useDispatch();
  // const buns = useSelector(bunSelector);
  // const ingredients = useSelector(ingredientSelector);
  // console.log(buns);

  const items = useSelector((state) => state.items.itemsArray);
  console.log(items);

  return (
    <div className={styles.constructor + " mt-25 ml-8 mr-2"}>
      <div className={styles.components_container}>
        {items.map((item) => {
          if (item.type === "bun")
            return (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${item.name} (верх)`}
                price={item.price}
                thumbnail={item.image}
              />
            );
        })}

        {/* <ConstructorElement
          type="top"
          isLocked={true}
          text="Флюоресцентная булка R2-D3 (верх)"
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
        /> */}
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
