// Задание 1 - галерея изображений
// Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. Посмотри демо видео работы галереи.

// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// 2. Реализация делегирования на div.gallery и получение url большого изображения.
// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// 4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// 5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

// <div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </div>

// Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. Запрети это поведение по умолчанию.

// Закрытие с клавиатуры
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox есть метод для программного закрытия модального окна.



import { galleryItems } from './gallery-items.js';
// Change code below this line

const body = document.querySelector("body");
const listGallery = document.querySelector(".gallery");

const createList = (galleryItems) => 
    galleryItems.reduce((acc, image) => acc +
        `<div class="gallery__item">
            <a class="gallery__link" href="${image.original}">
                <img
                class="gallery__image"
                src="${image.preview}"
                data-source="${image.original}"
                alt="${image.description}"
                />
            </a>
        </div>`, "");

listGallery.insertAdjacentHTML("beforeend" , createList(galleryItems));


listGallery.addEventListener('click', onClick);

function onClick(evt) {  
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') {
        return;
    }

    const instance = basicLightbox.create(`<img src="${evt.target.dataset.source}"/>`);
    instance.show(() => body.style.overflow = "hidden");

    window.addEventListener("keydown", onEscKeyPress);
   
    function onEscKeyPress(evt) {
        if (evt.code === "Escape") {
            instance.close();
            window.removeEventListener("keydown", onEscKeyPress);

            body.style.overflow = "auto";
        }
    }

    // идея в том что бы запретить прокручивание страници про открытой модалке
    window.addEventListener("click", hiddenScroll);

    function hiddenScroll(evt) {
        if (body.style.overflow === "hidden"){
            body.style.overflow = "auto";
        }
    }
}

// console.log(galleryItems);