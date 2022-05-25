import "bootstrap";
import css from "./styles.scss";
// импортируем список продуктов из модуля
import products from "./data_module";

// импортирует полезные функции
import { addHtml, clearHtml } from "./utils";

let totalPrice = 0;
const cart = {};
for (let product of products) {
  cart[product.name] = { ...product, count: 0 };
}
// после цикла cart будет содержать:
// {
//   "Котлета": {
//     name: "Котлета",
//     price: 1290,
//     count: 0
//   },
//   ...
// }
// при чем оригинальный объект продукта останется прежним

function renderItem({ name, price, count }) {
  // добавляет на страницу верстку для одного продукта

  addHtml(`
    <div class="p-2 bg-light border row justify-content-between">
    <div class="col-4">
      ${name} [ <i class="bi bi-cash"></i> ${price} руб ] - ${count} шт
      </div>
      <button class="addTocart btn btn-outline-success col-md-auto" data-name="${name}" data-price="${price}">
        Добавить
      </button>
  
    </div>
  `);
}

function renderPage() {
  // создает верстку страницы

  // очищаем все
  clearHtml();
  for (let product of products) {
    // добавляем по одному продукты из списка
    renderItem(cart[product.name]);
  }
  // добавляем в конце итог
  addHtml(`<p class="ms-3 fs-4 text">Итог: ${totalPrice} руб</p>`);

  // выбирает все кнопки по классу addTocart
  document.querySelectorAll(".addTocart").forEach((el) => {
    // навешиваем им событие на "клик"
    el.addEventListener("click", (event) => {
      // ЭТА ФУНКЦИЯ ВЫЗЫВАЕТСЯ ТОЛЬКО ПРИ КЛИКЕ

      // достаем из атрибутов значение свойств
      let name = event.target.getAttribute("data-name");
      let price = +event.target.getAttribute("data-price");
      // увеличиваем итог
      totalPrice += price;
      // увеличиваем количество в тележке
      cart[name].count += 1;
      // перерисовываем страницу
      renderPage();
    });
  });
}

renderPage();
