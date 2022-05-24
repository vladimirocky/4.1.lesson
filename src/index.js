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
    <p>
      ${name} [ ${price} руб ] - ${count} шт
      <button class="addTocart" data-name="${name}" data-price="${price}">
        Добавить
      </button>
    </p>
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
    addHtml(`Итог: ${totalPrice} руб`);

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
