// импортируем список продуктов из модуля
import products from './data_module';
// импортирует полезные функции
import { addHtml, clearHtml } from './utils';

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
    <div class="p-3 mb-2 bg-secondary text-info bg-dark">

    <p class="text-center fw-bold">

    <img src="icons8-ингредиенты-48.png">${name}</img>[ ${price} руб <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
    </svg> ] - ${count} шт

    <button class="addTocart btn btn-warning" data-name="${name}" data-price="${price}">
    Добавить
    </button>

    </p>

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
  addHtml(`<div class="text-success"><p class="text-center fw-bold"><img src="icons8-полная-корзина-16.png"> Итог: ${totalPrice} руб </p></div>`);

  // выбирает все кнопки по классу addTocart
  document.querySelectorAll('.addTocart').forEach((el) => {
    // навешиваем им событие на "клик"
    el.addEventListener('click', (event) => {
      // ЭТА ФУНКЦИЯ ВЫЗЫВАЕТСЯ ТОЛЬКО ПРИ КЛИКЕ

      // достаем из атрибутов значение свойств
      let name = event.target.getAttribute('data-name');
      let price = +event.target.getAttribute('data-price');
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
