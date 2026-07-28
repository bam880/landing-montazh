// ===== Мобильное меню (бургер) =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
});

// Закрываем меню при клике на ссылку
nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
    });
});

// Закрываем меню при клике вне его
document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        nav.classList.remove('open');
    }
});

// ===== Прячем плавающую кнопку возле футера, чтобы не перекрывала =====
const waFloat = document.querySelector('.wa-float');
const footer = document.getElementById('contacts');

// ===== Анимация появления блоков при скролле =====
const revealTargets = document.querySelectorAll('.card, .adv, .cta__box, .section__head');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

// ===== Тень шапки при скролле =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)';
    } else {
        header.style.boxShadow = 'none';
    }
});
