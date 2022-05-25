export function clearHtml() {
    // просто очищает содержимое страницы
    document.querySelector(".app_container").innerHTML = "";
}

export function addHtml(content) {
    // добавляет к содержимому страницы content
    document.querySelector(".app_container").innerHTML += content;
}
