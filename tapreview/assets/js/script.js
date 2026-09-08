/* =====================================================================
   TapReview — script.js (localized Italian)
   Ho tradotto tutte le stringhe visibili in italiano e rimosso riferimenti demo che
   potevano risultare fuorvianti per l'utente.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothNav();
  initScrollReveal();
  initHeroScrollScrub();
  initFaqAccordion();
  initConfigurator();
  initRoiCalculator();
});

/* Utility */
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function mapRange(value, inMin, inMax, outMin, outMax) { const t = clamp((value - inMin) / (inMax - inMin), 0, 1); return outMin + t * (outMax - outMin); }
function formatEUR(amount) { return new Intl.NumberFormat('it-IT', { maximumFractionDigits: 0 }).format(amount); }

/* Smooth navigation */
function initSmoothNav() {
  const HEADER_OFFSET = 72;
  document.querySelectorAll('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', () => {
      const targetSel = el.getAttribute('data-scroll-target');
      if (targetSel === '#top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      const target = document.querySelector(targetSel);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* Scroll reveal */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => observer.observe(el));
}

/* Hero scroll scrub */
function initHeroScrollScrub() {
  const heroSection = document.querySelector('[data-testid="hero-section"]') || document.getElementById('hero');
  if (!heroSection) return;
  const headline = heroSection.querySelector('[data-hero-el="headline"]');
  const scrollIndicator = heroSection.querySelector('[data-hero-el="scroll-indicator"]');
  const milestone1 = heroSection.querySelector('[data-hero-el="milestone-1"]');
  const milestone2 = heroSection.querySelector('[data-hero-el="milestone-2"]');
  const milestone3 = heroSection.querySelector('[data-hero-el="milestone-3"]');
  const canvas = document.getElementById('hero-canvas');
  if (scrollIndicator) { const chevron = scrollIndicator.querySelector('svg')?.parentElement; if (chevron) chevron.classList.add('scroll-chevron'); }
  let ticking = false;
  function update() {
    ticking = false;
    const rect = heroSection.getBoundingClientRect();
    const scrollableDistance = heroSection.offsetHeight - window.innerHeight;
    const progress = scrollableDistance > 0 ? clamp(-rect.top / scrollableDistance, 0, 1) : 0;
    const headlineOpacity = mapRange(progress, 0.00, 0.14, 1, 0);
    const headlineY = mapRange(progress, 0.00, 0.16, 0, -260);
    if (headline) { headline.style.opacity = headlineOpacity; headline.style.transform = `translateY(${headlineY}px)`; }
    if (scrollIndicator) { scrollIndicator.style.opacity = mapRange(progress, 0.00, 0.06, 1, 0); }
    if (milestone1) {
      const inOp = mapRange(progress, 0.16, 0.26, 0, 1);
      const outOp = mapRange(progress, 0.34, 0.40, 1, 0);
      const op = Math.min(inOp, outOp >= 0 && progress > 0.34 ? outOp : 1);
      const y = mapRange(progress, 0.16, 0.26, 26, 0);
      milestone1.style.opacity = progress < 0.16 ? 0 : op;
      milestone1.style.transform = `translateY(${Math.max(y, mapRange(progress, 0.34, 0.42, 0, -20))}px)`;
    }
    if (milestone2) {
      const inOp = mapRange(progress, 0.40, 0.50, 0, 1);
      const outOp = mapRange(progress, 0.58, 0.64, 1, 0);
      const op = Math.min(inOp, progress > 0.58 ? outOp : 1);
      const y = mapRange(progress, 0.40, 0.50, 26, 0);
      milestone2.style.opacity = progress < 0.40 ? 0 : op;
      milestone2.style.transform = `translateY(${Math.max(y, mapRange(progress, 0.58, 0.66, 0, -20))}px)`;
    }
    if (milestone3) {
      const op = mapRange(progress, 0.64, 0.82, 0, 1);
      const y = mapRange(progress, 0.64, 0.82, 26, 0);
      milestone3.style.opacity = progress < 0.64 ? 0 : op;
      milestone3.style.transform = `translateY(${y}px)`;
      milestone3.style.pointerEvents = progress > 0.7 ? 'auto' : 'none';
    }
    if (canvas) {
      const scale = 1 + progress * 0.12;
      const rotate = progress * 6;
      canvas.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
    }
  }
  function onScroll() { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* FAQ accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-state') === 'open';
      items.forEach((other) => {
        other.setAttribute('data-state', 'closed');
        const otherTrigger = other.querySelector('.faq-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        const panel = other.querySelector('.accordion-panel'); if (panel) panel.hidden = true;
      });
      if (!isOpen) {
        item.setAttribute('data-state', 'open');
        trigger.setAttribute('aria-expanded', 'true');
        const panel = item.querySelector('.accordion-panel'); if (panel) panel.hidden = false;
      }
    });
  });
}

/* Configurator */
function initConfigurator() {
  const section = document.querySelector('[data-testid="configurator-section"]');
  if (!section) return;
  const MATERIALS = {
    matte_black_pvc: { name: 'Nero opaco (PVC)', surchargePerCard: 0, label: 'Incluso' },
    brushed_gold: { name: 'Acciaio spazzolato oro', surchargePerCard: 15, label: '+€15/card' },
    eco_wood: { name: 'Eco-Wood Noce', surchargePerCard: 5, label: '+€5/card' },
  };
  const PACKS = {
    single: { name: 'Singola', price: 29, cards: 1 },
    business_3pack: { name: 'Business 3-Pack', price: 69, cards: 3 },
    enterprise_10pack: { name: 'Enterprise 10-Pack', price: 199, cards: 10 },
  };
  const materialButtons = section.querySelectorAll('[data-testid^="material-option-"]');
  const packButtons = section.querySelectorAll('[data-testid^="pack-option-"]');
  const priceEl = section.querySelector('[data-testid="configurator-live-price"]');
  const configSummaryEl = priceEl?.closest('.gold-border-gradient')?.querySelector('p.text-sm.text-zinc-300');
  const checkoutBtn = section.querySelector('[data-testid="stripe-checkout-button"]');
  const preview = section.querySelector('[data-testid="logo-preview-canvas"]');
  const uploadInput = section.querySelector('[data-testid="logo-upload-input"]');
  const uploadLabelText = section.querySelector('label span.text-sm.text-zinc-300');
  let state = { material: 'matte_black_pvc', pack: 'business_3pack' };
  function idFromTestid(el, prefix) { return el.getAttribute('data-testid').replace(prefix, ''); }
  function applySelectedStyles(buttons, selectedId, prefix) { buttons.forEach((btn) => { const id = idFromTestid(btn, prefix); const selected = id === selectedId; btn.classList.toggle('border-gold/60', selected); btn.classList.toggle('bg-gold/10', selected); btn.classList.toggle('shadow-[0_0_20px_rgba(212,175,55,0.15)]', selected); btn.classList.toggle('border-white/10', !selected); btn.classList.toggle('bg-card2/50', !selected); }); }
  function render() {
    const material = MATERIALS[state.material];
    const pack = PACKS[state.pack];
    const total = pack.price + material.surchargePerCard * pack.cards;
    if (priceEl) { const numberSpan = priceEl.querySelector('span'); if (numberSpan) numberSpan.textContent = formatEUR(total); }
    if (configSummaryEl) { configSummaryEl.textContent = `${pack.name} • ${material.name}`; }
    applySelectedStyles(materialButtons, state.material, 'material-option-');
    applySelectedStyles(packButtons, state.pack, 'pack-option-');
  }
  materialButtons.forEach((btn) => { btn.addEventListener('click', () => { state.material = idFromTestid(btn, 'material-option-'); render(); }); });
  packButtons.forEach((btn) => { btn.addEventListener('click', () => { state.pack = idFromTestid(btn, 'pack-option-'); render(); }); });
  render();
  if (uploadInput && preview) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev) => { let img = preview.querySelector('.uploaded-logo-preview'); if (!img) { img = document.createElement('img'); img.className = 'uploaded-logo-preview'; img.alt = 'Il tuo logo'; preview.appendChild(img); } img.src = ev.target.result; if (uploadLabelText) uploadLabelText.textContent = `Logo selezionato: ${file.name}`; }; reader.readAsDataURL(file);
    });
  }
  const previewWrap = preview?.parentElement;
  if (preview && previewWrap) {
    previewWrap.addEventListener('mousemove', (e) => { const rect = preview.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; const rotateY = x * 18; const rotateX = -y * 18; preview.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; });
    previewWrap.addEventListener('mouseleave', () => { preview.style.transform = 'rotateX(0deg) rotateY(0deg)'; });
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const material = MATERIALS[state.material];
      const pack = PACKS[state.pack];
      const total = pack.price + material.surchargePerCard * pack.cards;
      alert(
        `Ordine di esempio\n\n${pack.name} — ${material.name}\nTotale: €${formatEUR(total)}\n\nQuesta è una demo: integra un gateway di pagamento reale per completare ordini.`
      );
    });
  }
}

/* ROI calculator */
function initRoiCalculator() {
  const slider = document.querySelector('[data-testid="roi-calculator-slider"]');
  if (!slider) return;
  const dailyOutput = document.querySelector('[data-testid="roi-daily-customers-output"]');
  const reviewsOutput = document.querySelector('[data-testid="roi-monthly-reviews-output"]');
  const revenueOutput = document.querySelector('[data-testid="roi-revenue-boost-output"]');
  const rankOutput = document.querySelector('[data-testid="roi-rank-output"]');
  const CONVERSION_RATE = 0.035;
  const VALUE_PER_REVIEW = 47;
  function rankForReviews(reviews) {
    if (reviews < 50) return 'Top 20 risultati locali';
    if (reviews < 100) return 'Top 10 risultati locali';
    if (reviews < 250) return 'Top 5 risultati locali';
    return '#1 risultato locale';
  }
  function render() {
    const customers = parseInt(slider.value, 10);
    const monthlyReviews = Math.round(customers * 30 * CONVERSION_RATE);
    const revenue = monthlyReviews * VALUE_PER_REVIEW;
    if (dailyOutput) dailyOutput.textContent = customers;
    if (reviewsOutput) { const firstChild = reviewsOutput.childNodes[0]; if (firstChild) firstChild.textContent = '+'; const numberSpan = reviewsOutput.querySelector('span'); if (numberSpan) numberSpan.textContent = monthlyReviews; }
    if (revenueOutput) { const numberSpan = revenueOutput.querySelector('span'); if (numberSpan) numberSpan.textContent = `€${formatEUR(revenue)}`; }
    if (rankOutput) { const firstChild = rankOutput.childNodes[0]; if (firstChild) firstChild.textContent = rankForReviews(monthlyReviews); }
  }
  slider.addEventListener('input', render);
  render();
}
