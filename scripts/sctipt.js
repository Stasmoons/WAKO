// Функция для получения языка из URL хеша
function getLanguageFromHash() {
    const hash = window.location.hash;
    if (hash) {
        return hash.substring(1); // Удаляем символ '#'
    }
    return "ru";
}

// Получаем язык из URL
const language = getLanguageFromHash();

// Функция для обновления всех ссылок на странице с текущим хешем
function updateLinksWithLanguageHash() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.href = `${link.href}#${language}`;
    });
}

// Обновляем ссылки при загрузке страницы
updateLinksWithLanguageHash();


// Полное открытие окна WebApp
let tg = window.Telegram.WebApp;
tg.expand();
