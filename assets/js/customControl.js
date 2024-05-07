/*=============== SHOW MENU ===============*/
// Constantes des éléments du menu de navigation. 
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
// Valide l'existence de la constante
if (navToggle) {
    // Ajoute la classe 'show-menu' à 'navMenu' lorsqu'on clique sur 'navToggle'.
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
// Valide l'existence de la constante
if (navClose) {
    // Supprime la classe 'show-menu' de 'navMenu' lorsqu'on clique sur 'navClose'.
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
// Constantes qui récupèrent tous les éléments de la classe 'nav__link'.
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // Supprime la classe 'show-menu' de 'navMenu' lorsqu'on clique sur un lien de navigation.
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
    // Ajoute ou supprime la classe 'shadow-header' à 'header' en fonction du défilement de la page.
    this.scrollY >= 50 ? header.classList.add('shadow-header')
        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

/** FONCTIONNEMENT SCROLL SECTIONS ACTIVE LINK
 * Ajoute ou supprime la classe 'active-link' aux éléments de la barre de navigation en fonction de la position de défilement de la fenêtre.
 * Lorsque la position de défilement de la fenêtre est entre le haut de la section et le bas de la section (hauteur de la section),
 * la classe 'active-link' est ajoutée à l'élément de navigation correspondant.
 * Sinon, la classe 'active-link' est supprimée.
 */
const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)