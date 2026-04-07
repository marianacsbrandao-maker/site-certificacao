// Efeito suave no navbar ao rolar
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = 'rgba(201, 151, 58, 0.35)';
  } else {
    navbar.style.borderBottomColor = 'rgba(201, 151, 58, 0.2)';
  }
});

// Animação de entrada das seções
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.desafio-card, .cert-item, .categoria-card, .etapa, .entregavel, .beneficio, .parceiro'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
