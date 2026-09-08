/* =====================================================================
   TapReview — script.js
   Ricostruito da zero: il file HTML originale (salvato con SingleFile)
   non conteneva alcun <script>, quindi tutta la logica sottostante è
   stata riscritta ex novo osservando i data-testid, le classi Tailwind
   e gli stati "prima/dopo" congelati nel markup catturato.
   Nessuna libreria esterna richiesta: funziona anche offline.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothNav();
  initScrollReveal();
  initHeroScrollScrub();
  initFaqAccordion();
  initConfigurator();
  initRoiCalculator();
});

/* ---------------------------------------------------------------------
   Utility
   --------------------------------------------------------------------- */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

function formatEUR(amount) {
  return new Intl.NumberFormat('it-IT', { maximumFractionDigits: 0 }).format(amount);
}

/* ---------------------------------------------------------------------
   1) Smooth navigation (nav links, CTA buttons -> data-scroll-target)
   --------------------------------------------------------------------- */
function initSmoothNav() {
  const HEADER_OFFSET = 72; // matches the fixed h-16 navbar + a little breathing room

  document.querySelectorAll('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', () => {
      const targetSel = el.getAttribute('data-scroll-target');
      if (targetSel === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetSel);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------------------------------------------------------------------
   2) Generic scroll-reveal (fade + slide up) for elements tagged .reveal
      Replaces the GSAP ScrollTrigger fade-ins used in the live build.
   --------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   3) Hero pinned scroll-scrub sequence
      Markup shape (already in the HTML/CSS):
        <section class="relative h-[320vh]">      <- tall scroll track
          <div class="sticky top-0 h-screen">      <- pinned viewport
            headline  (data-hero-el="headline")
            scroll-indicator (data-hero-el="scroll-indicator")
            milestone-1/2/3  (data-hero-el="milestone-N")
      As the section scrolls through its 320vh height, we translate
      scroll progress (0-1) into opacity/translateY for each phase.
   --------------------------------------------------------------------- */
function initHeroScrollScrub() {
  const heroSection = document.querySelector('[data-testid="hero-section"]');
  if (!heroSection) return;

  const headline = heroSection.querySelector('[data-hero-el="headline"]');
  const scrollIndicator = heroSection.querySelector('[data-hero-el="scroll-indicator"]');
  const milestone1 = heroSection.querySelector('[data-hero-el="milestone-1"]');
  const milestone2 = heroSection.querySelector('[data-hero-el="milestone-2"]');
  const milestone3 = heroSection.querySelector('[data-hero-el="milestone-3"]');
  const canvas = document.getElementById('hero-canvas');

  // Give the chevron its idle bounce (independent of scroll position)
  if (scrollIndicator) {
    const chevron = scrollIndicator.querySelector('svg')?.parentElement;
    if (chevron) chevron.classList.add('scroll-chevron');
  }

  let ticking = false;

  function update() {
    ticking = false;
    const rect = heroSection.getBoundingClientRect();
    const scrollableDistance = heroSection.offsetHeight - window.innerHeight;
    const progress = scrollableDistance > 0
      ? clamp(-rect.top / scrollableDistance, 0, 1)
      : 0;

    // Phase A 0.00 - 0.16 : headline fully visible, then rises & fades out
    const headlineOpacity = mapRange(progress, 0.00, 0.14, 1, 0);
    const headlineY = mapRange(progress, 0.00, 0.16, 0, -260);
    if (headline) {
      headline.style.opacity = headlineOpacity;
      headline.style.transform = `translateY(${headlineY}px)`;
    }

    // Scroll indicator: only visible right at the very top
    if (scrollIndicator) {
      scrollIndicator.style.opacity = mapRange(progress, 0.00, 0.06, 1, 0);
    }

    // Phase B 0.16 - 0.40 : milestone 1 in, then out
    if (milestone1) {
      const inOp = mapRange(progress, 0.16, 0.26, 0, 1);
      const outOp = mapRange(progress, 0.34, 0.40, 1, 0);
      const op = Math.min(inOp, outOp >= 0 && progress > 0.34 ? outOp : 1);
      const y = mapRange(progress, 0.16, 0.26, 26, 0);
      milestone1.style.opacity = progress < 0.16 ? 0 : op;
      milestone1.style.transform = `translateY(${Math.max(y, mapRange(progress, 0.34, 0.42, 0, -20))}px)`;
    }

    // Phase C 0.40 - 0.64 : milestone 2 in, then out
    if (milestone2) {
      const inOp = mapRange(progress, 0.40, 0.50, 0, 1);
      const outOp = mapRange(progress, 0.58, 0.64, 1, 0);
      const op = Math.min(inOp, progress > 0.58 ? outOp : 1);
      const y = mapRange(progress, 0.40, 0.50, 26, 0);
      milestone2.style.opacity = progress < 0.40 ? 0 : op;
      milestone2.style.transform = `translateY(${Math.max(y, mapRange(progress, 0.58, 0.66, 0, -20))}px)`;
    }

    // Phase D 0.64 - 1.00 : milestone 3 (headline + CTA) fades in and stays
    if (milestone3) {
      const op = mapRange(progress, 0.64, 0.82, 0, 1);
      const y = mapRange(progress, 0.64, 0.82, 26, 0);
      milestone3.style.opacity = progress < 0.64 ? 0 : op;
      milestone3.style.transform = `translateY(${y}px)`;
      milestone3.style.pointerEvents = progress > 0.7 ? 'auto' : 'none';
    }

    if (canvas) {
      // Subtle parallax zoom/rotate on the hero backdrop as you scroll through
      const scale = 1 + progress * 0.12;
      const rotate = progress * 6;
      canvas.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
    }
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* ---------------------------------------------------------------------
   4) FAQ accordion (Radix UI in the original build -> plain JS here)
   --------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('[data-testid^="faq-accordion-item-"]');
  items.forEach((item) => {
    const trigger = item.querySelector('[data-testid^="faq-accordion-trigger-"]');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-state') === 'open';

      // close all (classic single-open accordion, matches the captured markup)
      items.forEach((other) => {
        other.setAttribute('data-state', 'closed');
        const otherTrigger = other.querySelector('[data-testid^="faq-accordion-trigger-"]');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.setAttribute('data-state', 'open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------------------------------------------------------------------
   5) Configurator: material + pack selection, live price, logo upload,
      3D tilt on the card preview, checkout button.
   --------------------------------------------------------------------- */
function initConfigurator() {
  const section = document.querySelector('[data-testid="configurator-section"]');
  if (!section) return;

  const MATERIALS = {
    matte_black_pvc: { name: 'Matte Black PVC', surchargePerCard: 0, label: 'Included' },
    brushed_gold: { name: 'Brushed Gold Steel', surchargePerCard: 15, label: '+€15/card' },
    eco_wood: { name: 'Eco-Wood Walnut', surchargePerCard: 5, label: '+€5/card' },
  };

  const PACKS = {
    single: { name: 'Single Card', price: 29, cards: 1 },
    business_3pack: { name: 'Business 3-Pack', price: 69, cards: 3 },
    enterprise_10pack: { name: 'Enterprise 10-Pack', price: 199, cards: 10 },
  };

  const materialButtons = section.querySelectorAll('[data-testid^="material-option-"]');
  const packButtons = section.querySelectorAll('[data-testid^="pack-option-"]');
  const priceEl = section.querySelector('[data-testid="configurator-live-price"]');
  const configSummaryEl = priceEl
    ?.closest('.gold-border-gradient')
    ?.querySelector('p.text-sm.text-zinc-300');
  const checkoutBtn = section.querySelector('[data-testid="stripe-checkout-button"]');
  const preview = section.querySelector('[data-testid="logo-preview-canvas"]');
  const uploadInput = section.querySelector('[data-testid="logo-upload-input"]');
  const uploadLabelText = section.querySelector('label span.text-sm.text-zinc-300');

  let state = {
    material: 'matte_black_pvc',
    pack: 'business_3pack',
  };

  function idFromTestid(el, prefix) {
    return el.getAttribute('data-testid').replace(prefix, '');
  }

  function applySelectedStyles(buttons, selectedId, prefix) {
    buttons.forEach((btn) => {
      const id = idFromTestid(btn, prefix);
      const selected = id === selectedId;
      btn.classList.toggle('border-gold/60', selected);
      btn.classList.toggle('bg-gold/10', selected);
      btn.classList.toggle('shadow-[0_0_20px_rgba(212,175,55,0.15)]', selected);
      btn.classList.toggle('border-white/10', !selected);
      btn.classList.toggle('bg-card2/50', !selected);
    });
  }

  function render() {
    const material = MATERIALS[state.material];
    const pack = PACKS[state.pack];
    const total = pack.price + material.surchargePerCard * pack.cards;

    if (priceEl) {
      // preserve the leading "€" text node, only update the number span
      const numberSpan = priceEl.querySelector('span');
      if (numberSpan) numberSpan.textContent = formatEUR(total);
    }

    if (configSummaryEl) {
      configSummaryEl.textContent = `${pack.name} • ${material.name}`;
    }

    applySelectedStyles(materialButtons, state.material, 'material-option-');
    applySelectedStyles(packButtons, state.pack, 'pack-option-');
  }

  materialButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.material = idFromTestid(btn, 'material-option-');
      render();
    });
  });

  packButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.pack = idFromTestid(btn, 'pack-option-');
      render();
    });
  });

  render();

  // ---- Logo upload: show a live preview inside the card mock-up ----
  if (uploadInput && preview) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        let img = preview.querySelector('.uploaded-logo-preview');
        if (!img) {
          img = document.createElement('img');
          img.className = 'uploaded-logo-preview';
          img.alt = 'Your logo';
          preview.appendChild(img);
        }
        img.src = ev.target.result;
        if (uploadLabelText) uploadLabelText.textContent = `Logo selected: ${file.name}`;
      };
      reader.readAsDataURL(file);
    });
  }

  // ---- 3D tilt effect on the card preview (mouse-follow parallax) ----
  const previewWrap = preview?.parentElement; // the element with style="perspective:1200px"
  if (preview && previewWrap) {
    previewWrap.addEventListener('mousemove', (e) => {
      const rect = preview.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * 18;
      const rotateX = -y * 18;
      preview.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    previewWrap.addEventListener('mouseleave', () => {
      preview.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // ---- Checkout button: no backend is included in this static export ----
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const material = MATERIALS[state.material];
      const pack = PACKS[state.pack];
      const total = pack.price + material.surchargePerCard * pack.cards;
      alert(
        `Demo checkout\n\n${pack.name} — ${material.name}\nTotale: €${formatEUR(total)}\n\n` +
        `Questo export statico non include un backend Stripe collegato: ` +
        `qui andrebbe l'integrazione reale con Stripe Checkout.`
      );
    });
  }
}

/* ---------------------------------------------------------------------
   6) ROI calculator (slider-driven)
   --------------------------------------------------------------------- */
function initRoiCalculator() {
  const slider = document.querySelector('[data-testid="roi-calculator-slider"]');
  if (!slider) return;

  const dailyOutput = document.querySelector('[data-testid="roi-daily-customers-output"]');
  const reviewsOutput = document.querySelector('[data-testid="roi-monthly-reviews-output"]');
  const revenueOutput = document.querySelector('[data-testid="roi-revenue-boost-output"]');
  const rankOutput = document.querySelector('[data-testid="roi-rank-output"]');

  const CONVERSION_RATE = 0.035; // 3.5% tap-to-review conversion (per copy on the page)
  const VALUE_PER_REVIEW = 47; // avg €47 new-customer value / review (per copy on the page)

  function rankForReviews(reviews) {
    if (reviews < 50) return 'Top 20 Local Results';
    if (reviews < 100) return 'Top 10 Local Results';
    if (reviews < 250) return 'Top 5 Local Results';
    return '#1 Local Result';
  }

  function render() {
    const customers = parseInt(slider.value, 10);
    const monthlyReviews = Math.round(customers * 30 * CONVERSION_RATE);
    const revenue = monthlyReviews * VALUE_PER_REVIEW;

    if (dailyOutput) dailyOutput.textContent = customers;

    if (reviewsOutput) {
      // structure is "+<number><p>...</p>..." — update just the first text/number node
      const firstChild = reviewsOutput.childNodes[0];
      if (firstChild) firstChild.textContent = '+';
      const numberSpan = reviewsOutput.querySelector('span');
      if (numberSpan) numberSpan.textContent = monthlyReviews;
    }

    if (revenueOutput) {
      const numberSpan = revenueOutput.querySelector('span');
      if (numberSpan) numberSpan.textContent = `€${formatEUR(revenue)}`;
    }

    if (rankOutput) {
      const firstChild = rankOutput.childNodes[0];
      if (firstChild) firstChild.textContent = rankForReviews(monthlyReviews);
    }
  }

  slider.addEventListener('input', render);
  render();
}
