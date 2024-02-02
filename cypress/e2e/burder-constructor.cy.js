describe("тестирование веб приложения", () => {
  it("загружаем массив ингредиентов", () => {
    cy.intercept("api/ingredients", {
      fixture: "hardCodedIngredients.json",
    });
  });

  it("доступность сервиса по адрeсу localhost:3000", () => {
    cy.visit("http://localhost:3000/");
  });

  it("открытие и закрытие попапа детали ингредиента", () => {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    cy.get('[class^="burger-ingredient_card"]').first().click();
    cy.contains("Детали ингредиента");
    cy.wait(1000);
    cy.get('[class^="modal_closeButton"]').click();
    cy.visit("http://localhost:3000/");
  });

  it("тестируем основной функционал", () => {
    cy.visit("http://localhost:3000/");

    cy.log("добавим булочки и ингредиенты");
    cy.get('[class^="burger-ingredient_card"]')
      .first()
      .trigger("dragstart")
      .wait(500)
      .get('[class^="burger-constructor_components"]')
      .eq(1)
      .trigger("drop");
    cy.get('[class^="burger-ingredient_card"]')
      .eq(7)
      .trigger("dragstart")
      .wait(500)
      .get('[class^="burger-constructor_components"]')
      .eq(1)
      .trigger("drop");
    cy.get('[class^="burger-ingredient_card"]')
      .eq(5)
      .trigger("dragstart")
      .wait(500)
      .get('[class^="burger-constructor_components"]')
      .eq(1)
      .trigger("drop");
    cy.get('[class^="burger-ingredient_card"]')
      .eq(3)
      .trigger("dragstart")
      .wait(500)
      .get('[class^="burger-constructor_components"]')
      .eq(1)
      .trigger("drop");
    cy.get('[class^="burger-ingredient_card"]')
      .eq(8)
      .trigger("dragstart")
      .wait(500)
      .get('[class^="burger-constructor_components"]')
      .eq(1)
      .trigger("drop");

    cy.log("удалим лишние ингредиенты");
    cy.get("[class^=constructor-element__action]").eq(2).click();
    cy.get('[class^="burger-constructor_components"]').eq(4).and("not.exist");
    // Нажимаем на кнопку офрмить заказ и редиректимся на страницу логина
    cy.log("нажимаем кнопку офрмления заказа");
    cy.get('[class^="button"]').contains("Оформить заказ").click();
    // Логинимся
    cy.log("ввод данных для входа");
    cy.get("input").first().type("test@test.com");
    cy.get("input").last().type("12345");
    cy.get('[class^="button"]')
      .contains("Войти")
      .click()
      .intercept("api/auth/login", { fixture: "hardCodedlogin.json" });
    // Повторное оформление заказа
    cy.log("Повторная попытка оформления заказа");
    cy.get('[class^="button"]')
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
