import { v4 as uuidv4 } from "uuid";
import { postOrder } from "../ordersQuery";
import constructorSliceReducer, {
  bun,
  initialState,
  addIngredients,
  clearConstructor,
  delIngredients,
  changeIngredients,
} from "./constructor-slice";

const hardcodedBun = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
  constructorId: "fghfghfg456546",
};

export const hardcodedIngredients = [
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa0943",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa093f",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
  },
];

jest.mock("uuid", () => ({
  ...jest.requireActual("uuid"),
  v4: jest.fn(() => "fghfghfg456546"),
}));

describe("Тест constructorSlice", () => {
  it("Добавление булочки bun", () => {
    uuidv4.mockReturnValue("fghfghfg456546");
    expect(constructorSliceReducer(initialState, bun(hardcodedBun))).toEqual({
      ...initialState,
      bun: { ...hardcodedBun },
    });
  });
  it(" Добавление ингредиента addIngredients", () => {
    const ingredient = hardcodedIngredients[0];

    uuidv4.mockReturnValue("fghfghfg456546");

    expect(
      constructorSliceReducer(initialState, addIngredients(ingredient))
    ).toEqual({
      ...initialState,
      ingredients: [{ ...ingredient, constructorId: "fghfghfg456546" }],
    });
  });

  it("Очистка конструктора clearConstructor ", () => {
    const state = {
      bun: hardcodedBun,
      ingredients: hardcodedIngredients,
      order: 31237,
    };
    const clearState = constructorSliceReducer(state, clearConstructor());

    expect(clearState.bun).toEqual(null);
    expect(clearState.ingredients).toEqual([]);
    expect(clearState.order).toEqual(null);
  });
  it("Перемещение ингредиентов changeIngredients", () => {
    const initialState = {
      ingredients: [
        { ...hardcodedIngredients[0], constructorId: "321" },
        { ...hardcodedIngredients[1], constructorId: "4321" },
        { ...hardcodedIngredients[2], constructorId: "54321" },
      ],
    };

    const changeState = {
      indexFrom: 0,
      indexTo: 1,
      ingredient: { ...hardcodedIngredients[0], constructorId: "321" },
    };

    expect(
      constructorSliceReducer(initialState, changeIngredients(changeState))
    ).toEqual({
      ...initialState,
      ingredients: [
        { ...hardcodedIngredients[1], constructorId: "4321" },
        { ...hardcodedIngredients[0], constructorId: "321" },
        { ...hardcodedIngredients[2], constructorId: "54321" },
      ],
    });
  });
});
it("Удаление ингредиента delIngredients", () => {
  const state = {
    ...initialState,
    ingredients: [
      { ...hardcodedIngredients[1], constructorId: "4321" },
      { ...hardcodedIngredients[0], constructorId: "321" },
      { ...hardcodedIngredients[2], constructorId: "54321" },
    ],
  };

  const delIngredient = {
    ...hardcodedIngredients[1],
    constructorId: "4321",
  };

  expect(constructorSliceReducer(state, delIngredients(delIngredient))).toEqual(
    {
      ...initialState,
      ingredients: [
        { ...hardcodedIngredients[0], constructorId: "321" },
        { ...hardcodedIngredients[2], constructorId: "54321" },
      ],
    }
  );
});

it("Проверка отправки заказа postOrder.pending", () => {
  const nextState = constructorSliceReducer(initialState, postOrder.pending());

  expect(nextState.isOrderPending).toEqual(true);
});
it("Проверка отправки заказа postOrder.fulfilled", () => {
  const payload = { name: "Стенли Кубрик", order: { number: 12345 } };
  const nextState = constructorSliceReducer(
    initialState,
    postOrder.fulfilled(payload)
  );

  expect(nextState.name).toEqual(payload.name);
  expect(nextState.order).toEqual(payload.order.number);
  expect(nextState.isOrderPending).toEqual(false);
});
