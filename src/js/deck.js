import { getLocalStorage, loadCommonElements } from "./utils.mjs";

function cardTemplate(card) {
    const html = `
        <figure class="img-container">
            <a href="/card/?id=${card.id}"><img src="/images/small/${card.id}.jpg" alt="${card.name}> width="268" height="391"></a>
        </figure>
    `;
    return html;
}

function displayCards() {
    const mainDeckContainer = document.querySelector('.main-deck');
    const sideDeckContainer = document.querySelector('.side-deck');
    const extraDeckContainer = document.querySelector('.extra-deck');

    const mainCards = getLocalStorage('main').map(cardTemplate);
    const sideCards = getLocalStorage('side').map(cardTemplate);
    const extraCards = getLocalStorage('extra').map(cardTemplate);

    mainDeckContainer.innerHTML = mainCards.join('');
    sideDeckContainer.innerHTML = sideCards.join('');
    extraDeckContainer.innerHTML = extraCards.join('');
}

loadCommonElements();
displayCards();