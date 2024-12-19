import setupNavigation from "./navigation.js";

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

export async function loadCommonElements() {
    // Templates
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');
    const navTemplate = await loadTemplate('/partials/navigation.html');

    // DOM elements
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');
    const nav = document.getElementById('main-nav');
    
    header.innerHTML = headerTemplate;
    footer.innerHTML = footerTemplate;
    nav.innerHTML = navTemplate;

    setupNavigation();
}

export function addToDeck(deckName, card) {
    const cards = getLocalStorage(deckName.toLowerCase());
    if (cards.length) {  
        cards.push(card);
        setLocalStorage(deckName, cards);
    } else {
        setLocalStorage(deckName, [ card ]);
    }
}

async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}