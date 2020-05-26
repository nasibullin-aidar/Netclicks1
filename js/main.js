

// меню
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const dataBack = document.querySelectorAll('.tv-card__img');
// открытие/закрытие меню

hamburger.addEventListener('click', () => {
  leftMenu.classList.toggle('openMenu');
  hamburger.classList.toggle('open');
});

// чтоб закрывалось при нажатии в любое место на сайте

document.body.addEventListener('click', (event) => {
  if (!event.target.closest('.left-menu')) {
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
  }
})

// closest (17 строка) проверяет есть ли класс выше по дереву, начиная с себя 
// remove (18 строка) удаляет класс

leftMenu.addEventListener('click', (event) => {
  const target = event.target;
  const dropdown = target.closest('.dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
    leftMenu.classList.add('openMenu');
    hamburger.classList.add('open');
  }
});

// показывать изображение д/з

dataBack.forEach(element => {   // выбираем каждый элемент массива
  const source = element.src;   
  element.addEventListener('mouseenter', () => { //при наведении 
    element.src = element.dataset.backdrop;
  });

  element.addEventListener('mouseleave', () => { //вне поля
    element.src = source;
  });
});