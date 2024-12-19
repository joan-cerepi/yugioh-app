import CardData from "./CardData.mjs";
import { getLocalStorage, setLocalStorage, loadCommonElements } from "./utils.mjs";

const cards = new CardData('/json/cardinfo.json');

function checkTime(startTime, currentTime) {
    const millisecondsInADay = 86400000;
    return currentTime - startTime > millisecondsInADay;
}

function cardTemplate(card) {
    const html = `
        <figure>
            <picture>
                <source srcset="/images/regular/${card.id}.jpg" media="(min-width: 800px)">
                <a href="/card/?id=${card.id}"><img src="/images/small/${card.id}.jpg" alt="${card.name}" loading="lazy" width="268" height="391" class="cod-image"></a>
            </picture>
            <figcaption>${card.name}</figcaption>
        </figure>
    `;

    return html;
}

// Update the DOM with a new displayed card
// after 24 hours have elapsed.
async function updateRandomCard() {
    const parent = document.querySelector('.card');
    const card = await cards.getRandomCard();
    parent.innerHTML = cardTemplate(card);
    setLocalStorage('card', card);
    setLocalStorage('time-passed', Date.now());
}

async function setRandomCard() {
    const parent = document.querySelector('.card');
    const defaultCard = await cards.getAllCardInfo()[0];
    const card = getLocalStorage('card') || JSON.parse(defaultCard);
    parent.innerHTML = cardTemplate(card);
}

async function displayRandomCards() {
    const parent = document.querySelector('.random-cards');
    const randomCards = [];
    for (let i = 0; i < 3; i++) {
        const card = await cards.getRandomCard();
        randomCards.push(card);
    }
    randomCards.forEach(card => {
        parent.innerHTML += cardTemplate(card);
    });
}

async function displayRandomCard() {
    const timestamp = getLocalStorage('time-passed');
    const hasItBeen24H = checkTime(timestamp, Date.now());

    if (!hasItBeen24H) setRandomCard();
    else updateRandomCard();
}

displayRandomCard();
displayRandomCards();
loadCommonElements();