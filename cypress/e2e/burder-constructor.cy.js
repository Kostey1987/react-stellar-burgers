import {
  testUrl,
  testCardSelector,
  testConructorSelector,
  testButtonSelector,
} from "../../src/utils/constants";

describe("тестирование веб приложения", () => {
  it("загружаем массив ингредиентов", () => {
    cy.intercept("api/ingredients", {
      fixture: "hardCodedIngredients.json",
    });
  });

  it("доступность сервиса по адрeсу localhost:3000", () => {
    cy.visit(testUrl);
  });

  it("открытие и закрытие попапа детали ингредиента", () => {
    cy.visit(testUrl);
    cy.wait(1000);
    cy.get(testCardSelector).first().click();
    cy.contains("Детали ингредиента");
    cy.wait(1000);
    cy.get('[class^="modal_closeButton"]').click();
    cy.visit(testUrl);
  });

  it("тестируем основной функционал", () => {
    cy.visit(testUrl);

    cy.log("добавим булочки и ингредиенты");
    cy.get(testCardSelector)
      .first()
      .trigger("dragstart")
      .wait(500)
      .get(testConructorSelector)
      .eq(1)
      .trigger("drop");
    cy.get(testCardSelector)
      .eq(7)
      .trigger("dragstart")
      .wait(500)
      .get(testConructorSelector)
      .eq(1)
      .trigger("drop");
    cy.get(testCardSelector)
      .eq(5)
      .trigger("dragstart")
      .wait(500)
      .get(testConructorSelector)
      .eq(1)
      .trigger("drop");
    cy.get(testCardSelector)
      .eq(3)
      .trigger("dragstart")
      .wait(500)
      .get(testConructorSelector)
      .eq(1)
      .trigger("drop");
    cy.get(testCardSelector)
      .eq(8)
      .trigger("dragstart")
      .wait(500)
      .get(testConructorSelector)
      .eq(1)
      .trigger("drop");

    cy.log("удалим лишние ингредиенты");
    cy.get("[class^=constructor-element__action]").eq(2).click();
    cy.get(testConructorSelector).eq(4).and("not.exist");
    // Нажимаем на кнопку офрмить заказ и редиректимся на страницу логина
    cy.log("нажимаем кнопку офрмления заказа");
    cy.get(testButtonSelector).contains("Оформить заказ").click();
    // Логинимся
    cy.log("ввод данных для входа");
    cy.get("input").first().type("test@test.com");
    cy.get("input").last().type("12345");
    cy.get(testButtonSelector)
      .contains("Войти")
      .click()
      .intercept("api/auth/login", { fixture: "hardCodedlogin.json" });
    // Повторное оформление заказа
    cy.log("Повторная попытка оформления заказа");
    cy.get(testButtonSelector)
      .contains("Оформить заказ")
      .click()
      .intercept(
        { url: "api/orders", method: "POST" },
        { fixture: "hardCodedOrder.json", delay: 3000 }
      )
      .intercept("api/auth/login", { fixture: "hardCodedlogin.json" });
    cy.wait(5000);
    cy.log("Проверка модального окна с номером заказа 33528");
    cy.contains("33528");
    cy.wait(1000);
  });
});
