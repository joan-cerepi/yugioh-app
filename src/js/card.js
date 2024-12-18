import { loadCommonElements } from "./utils.mjs";
import CardData from "./CardData.mjs";

const allCardData = new CardData('/json/cardinfo.json');
const params = new URLSearchParams(document.location.search);

async function loadCardDetails() {
    const detailsContainer = document.getElementById('card-details');
    const id = Number(params.get('id'));
    const card = await allCardData.getCardById(id);
    detailsContainer.innerHTML = detailsTemplate(card);
}

function detailsTemplate(card) {
    const html = `
        <h2 class="card-name-title">${card.name}</h2>
        <picture class="card-image">
            <source srcset="/images/regular/${card.id}.jpg" media="(min-width: 500px)">
            <img src="/images/small/${card.id}.jpg" alt="${card.name}" width="268" height="391" loading="lazy">
        </picture>
        <div class="details">
            <p>Name:<br>${card.name}</p>
            <p>Type:<br>${card.type} (${card.humanReadableCardType})</p>
            <p>Description:<br>${card.desc}</p>
        </div>
    `;
    return html;
}

loadCommonElements();
loadCardDetails();