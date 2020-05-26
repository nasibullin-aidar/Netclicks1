const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const dataBack = document.querySelectorAll('.tv-card__img');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 'fb60baf6729226dcfcc3a6a662b741bc';

// обращение к БД // хз вообще не понял, так понял запрос к БД
const DBService = class {

  getData = async (url) => {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Не удалось получить данные по адресу ${url}')
    }
  }

  getTestData = async () => {
    return await this.getData('test.json')
  }
}

const renderCard = response => {
  tvShowsList.textContent = '';

  response.results.forEach(item => {

    const { 
      backdrop_path: backdrop,
      name: title,
      poster_path: poster,
      vote_average: vote,
         } = item;

  // ЕСЛИ УДАЛИТЬ (ниже) ТО БУДЕТ РАБОТАТЬ почему то не работает
    const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
    const backdropIMG = '';  // ДЗ если нет backdrop то не добавляем ничего
    const voteElem = ''; 

    const card = document.createElement('li');
    card.className = 'tv-shows__item';
    card.innerHTML = `
     <a href="#" class="tv-card">
        <span class="tv-card__vote">${vote}</span>
        <img class="tv-card__img"
              src="${posterIMG}"
              data-backdrop="${IMG_URL + backdrop}"
              alt="${title}">
        <h4 class="tv-card__head">${title}</h4>
      </a>
    `;


    tvShowsList.append(card);
  });
};

new DBService().getTestData().then(renderCard);


// меню


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

dataBack.forEach(element => { // выбираем каждый элемент массива
  const source = element.src; // задаем текущее src как константу, что бы при убирании мыши ее вернуть
  element.addEventListener('mouseenter', () => { //при наведении  
    // НАФИСУ ВОПРОС : почему нельзя вместо element.src забить source ведь выше задана константа
    element.src = element.dataset.backdrop; // меняем местами element.src и dataset
  });

  element.addEventListener('mouseleave', () => { //вне поля
    element.src = source;
  });
});

// открытие модального окна
tvShowsList.addEventListener('click', event => {
  const target = event.target;
  const card = target.closest('.tv-card');

  if (card) {
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hide');
  }
});

// Закрытие модального окна
modal.addEventListener('click', event => {
  if (event.target.closest('.cross') ||
    event.target.classList.contains('modal')) {
    document.body.style.overflow = '';
    modal.classList.add('hide');
  }

});