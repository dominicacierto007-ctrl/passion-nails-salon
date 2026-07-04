// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header shrink on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20 ? '0 10px 30px -20px rgba(0,0,0,.6)' : 'none';
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// About section parallax scroll
const aboutParallax = document.getElementById('aboutParallax');
if (aboutParallax) {
  const colA = aboutParallax.querySelector('.parallax-col-a');
  const colB = aboutParallax.querySelector('.parallax-col-b');
  let ticking = false;

  const applyParallax = () => {
    const maxScroll = aboutParallax.scrollHeight - aboutParallax.clientHeight;
    const progress = maxScroll > 0 ? aboutParallax.scrollTop / maxScroll : 0;

    const translateY = progress * -80;
    colA.style.transform = `translate(${progress * -30}px, ${translateY}px) rotate(${progress * -6}deg)`;
    colB.style.transform = `translate(${progress * 30}px, ${translateY}px) rotate(${progress * 6}deg)`;
    ticking = false;
  };

  aboutParallax.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  });
}

// Service menu tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('is-active'));
    menuPanels.forEach(p => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.querySelector(`.menu-panel[data-panel="${tab.dataset.tab}"]`).classList.add('is-active');
  });
});
