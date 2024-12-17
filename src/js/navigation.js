export default function setupNavigation() {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.getElementById('main-nav');
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('change');
        nav.classList.toggle('show');
    });
}