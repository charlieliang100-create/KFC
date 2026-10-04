const journeyStart = document.querySelector('#journeyStart');
const history = document.querySelector('#history');
const menu = document.querySelector('#menu');

journeyStart.addEventListener('click', () => {
  history.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => {
    history.querySelector('.chapter-next')?.focus({ preventScroll: true });
  }, 650);
});

const chapters = [...document.querySelectorAll('.chapter')];
chapters.forEach((chapter, index) => {
  const button = chapter.querySelector('.chapter-next');
  if (index > 0) button.disabled = true;
});

document.querySelectorAll('.chapter-next:not(.final-chapter)').forEach((button) => {
  button.addEventListener('click', () => {
    const current = button.closest('.chapter');
    const next = current?.nextElementSibling;
    if (!next) return;
    current.classList.remove('is-active');
    button.disabled = true;
    next.classList.add('is-active');
    next.querySelector('.chapter-next').disabled = false;
    next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    next.querySelector('.chapter-next')?.focus({ preventScroll: true });
    const index = [...document.querySelectorAll('.chapter')].indexOf(next) + 1;
    document.querySelector('.progress-fill').style.width = `${index * 28}px`;
    document.querySelector('.history-progress b').textContent = String(index).padStart(2, '0');
  });
});

document.querySelector('#historyToMenu').addEventListener('click', () => {
  menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => menu.querySelector('.more-button')?.focus({ preventScroll: true }), 650);
});

document.querySelectorAll('.more-button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.menu-card');
    const isOpen = card.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.firstChild.textContent = isOpen ? 'Close ' : 'See more ';
  });
});
