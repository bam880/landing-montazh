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

// ===== Яндекс.Метрика: цели (клик WhatsApp / телефон / отправка формы) =====
const YM_ID = 111122593;
function ymGoal(goal) {
    if (typeof ym === 'function') {
        try { ym(YM_ID, 'reachGoal', goal); } catch (e) {}
    }
}

// Отслеживаем клики по WhatsApp и по номеру телефона (в любом месте страницы)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
        ymGoal('whatsapp');
    } else if (href.indexOf('tel:') === 0) {
        ymGoal('phone');
    }
});

// Цель «Вызвать мастера» — клики по кнопкам-призывам (ведут к форме)
document.querySelectorAll('.js-goal-master').forEach((el) => {
    el.addEventListener('click', () => ymGoal('call_master'));
});

// ===== Форма заявки: отправка в WhatsApp + цель form_submit =====
const WHATSAPP_NUMBER = '77075224869';
const leadForm = document.getElementById('leadForm');

if (leadForm) {
    const nameInput = document.getElementById('leadName');
    const phoneInput = document.getElementById('leadPhone');
    const problemInput = document.getElementById('leadProblem');
    const submitBtn = leadForm.querySelector('.lead-form__btn');
    const submitLabel = submitBtn ? submitBtn.textContent : 'Отправить заявку';

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const problem = problemInput ? problemInput.value.trim() : '';
        const digits = phone.replace(/\D/g, '');
        let ok = true;

        // Валидация
        nameInput.classList.remove('is-error');
        phoneInput.classList.remove('is-error');
        if (name.length < 2) { nameInput.classList.add('is-error'); ok = false; }
        if (digits.length < 10) { phoneInput.classList.add('is-error'); ok = false; }
        if (!ok) return;

        // Цель Метрики
        ymGoal('form_submit');

        // Формируем сообщение и открываем WhatsApp
        let text =
            'Заявка с сайта tehmontazh\n' +
            'Имя: ' + name + '\n' +
            'Телефон: ' + phone;
        if (problem) text += '\nПроблема: ' + problem;
        const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank');

        // Успех
        leadForm.classList.add('is-sent');
        if (submitBtn) submitBtn.textContent = '✓ Заявка отправлена';
        leadForm.reset();
        setTimeout(() => {
            leadForm.classList.remove('is-sent');
            if (submitBtn) submitBtn.textContent = submitLabel;
        }, 4000);
    });

    // Убираем подсветку ошибки при вводе
    [nameInput, phoneInput].forEach((el) => {
        el.addEventListener('input', () => el.classList.remove('is-error'));
    });
}

// ===== FAQ аккордеон =====
document.querySelectorAll('.faq__item').forEach((item) => {
    const q = item.querySelector('.faq__q');
    const a = item.querySelector('.faq__a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Закрываем остальные
        document.querySelectorAll('.faq__item.open').forEach((other) => {
            if (other !== item) {
                other.classList.remove('open');
                const oa = other.querySelector('.faq__a');
                if (oa) oa.style.maxHeight = null;
            }
        });
        if (isOpen) {
            item.classList.remove('open');
            a.style.maxHeight = null;
        } else {
            item.classList.add('open');
            a.style.maxHeight = a.scrollHeight + 'px';
        }
    });
});
