import { loadCommonElements } from "./utils.mjs";
import CardData from "./CardData.mjs";

const allCardData = new CardData('/json/cardinfo.json');

function cardTemplate(card) {
    const html = `
        <div class="card">
            <a href="/card/?id=${card.id}"><img src="/images/small/${card.id}.jpg" alt="${card.name} loading="lazy" width="268" height="391"></a>
        </div>
    `;
    return html;
}

function loadDatabase() {
    // DOM elements
    const searchBar = document.getElementById('card-search');
    const cardContainer = document.getElementById('card-database');
    const cardCounter = document.getElementById('counter');

    // Default text content of DOM elements
    cardCounter.textContent = 0;
    cardContainer.textContent = 'Cards will show here when you start typing.';

    searchBar.addEventListener('keyup', async (e) => {
        const cards = await allCardData.searchByCardName(searchBar.value);
        const html = cards.map(cardTemplate)
        cardCounter.textContent = cards.length.toLocaleString('en-US');
        if (cards.length === 0) {
            cardContainer.textContent = 'No cards to show by that name.'
        } else {
            cardContainer.innerHTML = html.join('');
        }
    });
}

loadCommonElements();
loadDatabase();