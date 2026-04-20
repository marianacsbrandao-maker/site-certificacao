function setVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVH();
window.addEventListener('resize', setVH);

// Fade-up
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Botão nav muda cor ao sair do hero
const navCta = document.getElementById('nav-cta');
const hero = document.getElementById('home');
if (navCta && hero) {
  new IntersectionObserver((entries) => {
    entries.forEach(e => navCta.classList.toggle('light', !e.isIntersecting));
  }, { threshold: 0.1 }).observe(hero);
}

// Categorias: hover individual via JS
document.querySelectorAll('.categoria-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('expanded'));
  card.addEventListener('mouseleave', () => card.classList.remove('expanded'));
});

// Formulário Web3Forms
const form = document.getElementById('contato-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    const json = JSON.stringify(Object.fromEntries(new FormData(form)));
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
      });
      const result = await res.json();
      if (result.success) {
        btn.textContent = '✓ Mensagem enviada!';
        btn.style.background = '#128743';
        btn.style.color = '#fff';
        btn.style.opacity = '1';
        form.reset();
        setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; }, 4000);
      } else throw new Error();
    } catch {
      btn.textContent = 'Erro ao enviar. Tente novamente.';
      btn.style.background = '#8B0000';
      btn.style.color = '#fff';
      btn.style.opacity = '1';
      setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; }, 4000);
    }
  });
}
