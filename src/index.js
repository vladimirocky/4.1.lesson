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
    <div class="p-3 mb-2 bg-secondary text-white">

    <p class="text-center fw-bold">

    <img src="image1.png">${name}</img>[ ${price} руб <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
    </svg> ] - ${count} шт

    <button class="addTocart btn btn-warning" data-name="${name}" data-price="${price}">
    Добавить
    </button>

    <button class="removeTocart btn btn-danger" data-name="${name}" data-price="${price}">
    Удалить
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
    
    addHtml(`<div class="p-3 mb-2 bg-success text-white">

    <p class="text-center fw-bold">

      Итог : ${totalPrice} <img src="rubl.png"></img>
    </p>

    </div>
    `);

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

    document.querySelectorAll(".removeTocart").forEach((el) => {
      el.addEventListener("click", (event) => {
        let name = event.target.getAttribute("data-name");
        let price = event.target.getAttribute("data-price");
  
        totalPrice -= price;
        if (totalPrice < 0) {
          totalPrice = 0;
        }
  
        cart[name].count -= 1;
        if (cart[name].count < 0) {
          cart[name].count = 0;
        }
        renderPage();
      });
    });
}

renderPage();
