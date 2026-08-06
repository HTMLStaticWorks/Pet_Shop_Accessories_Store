/* PET SHOP - Your Friendly Neighborhood Pet Store - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initFAQ();
  initProductDetailsTabs();
  initGallery();
  initSubscriptionBuilder();
  initRecipeFilter();
  initGutQuiz();
  initPasswordToggles();
  initScrollTopButton();
  initDropdowns();
});

/* Theme Manager */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
    updateThemeIcons('dark');
  } else {
    document.body.classList.remove('dark-theme');
    updateThemeIcons('light');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark ? 'dark' : 'light');
    });
  });
}

function updateThemeIcons(mode) {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  themeToggleBtns.forEach(btn => {
    if (mode === 'dark') {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      `;
    } else {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      `;
    }
  });
}

/* LTR/RTL Layout Direction Manager */
function initRTL() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
  const storedDir = localStorage.getItem('layout-direction') || 'ltr';

  applyLayoutDirection(storedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyLayoutDirection(nextDir);
      localStorage.setItem('layout-direction', nextDir);
    });
  });
}

function applyLayoutDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
  rtlToggleBtns.forEach(btn => {
    btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* Sticky Header */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  }
}

/* Mobile Menu */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {

    /* â”€â”€ Close button at top of drawer â”€â”€ */
    if (!mobileNav.querySelector('.mobile-nav-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'mobile-nav-close';
      closeBtn.setAttribute('aria-label', 'Close Menu');
      closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" style="width:22px;height:22px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>`;
      closeBtn.style.cssText = [
        'display:flex', 'align-items:center', 'justify-content:center',
        'width:36px', 'height:36px', 'border-radius:50%',
        'border:1px solid var(--border)', 'background:var(--surface)',
        'color:var(--text-primary)', 'cursor:pointer',
        'margin:16px 16px 8px auto', 'transition:var(--transition)', 'flex-shrink:0'
      ].join(';');
      closeBtn.addEventListener('click', closeMobileNav);
      mobileNav.insertBefore(closeBtn, mobileNav.firstChild);
    }

    /* â”€â”€ Strip any leftover nav-link Sign In/Up links from drawer â”€â”€ */
    ['a[href="login.html"]', 'a[href="signup.html"]']
      .forEach(sel => mobileNav.querySelectorAll(sel).forEach(el => el.remove()));

    /* â”€â”€ Inject bottom controls: Theme, RTL, Sign Up (once only) â”€â”€ */
    if (!mobileNav.querySelector('.drawer-controls')) {
      const controls = document.createElement('div');
      controls.className = 'drawer-controls';
      controls.style.cssText = [
        'display:flex', 'flex-direction:column', 'gap:12px',
        'padding-top:20px', 'border-top:1px solid var(--border)', 'margin-top:20px'
      ].join(';');

      /* Row: Theme toggle + RTL toggle side by side */
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:10px;';

      const themeBtn = document.createElement('button');
      themeBtn.className = 'theme-toggle';
      themeBtn.setAttribute('aria-label', 'Toggle Theme');
      themeBtn.style.cssText = [
        'width:44px', 'height:44px', 'flex:0', 'border-radius:50%',
        'border:1px solid var(--border)', 'background:var(--surface)',
        'color:var(--text-primary)', 'cursor:pointer',
        'display:flex', 'align-items:center', 'justify-content:center',
        'transition:var(--transition)', 'font-size:11px', 'flex-shrink:0'
      ].join(';');

      const rtlBtn = document.createElement('button');
      rtlBtn.className = 'rtl-toggle';
      rtlBtn.setAttribute('aria-label', 'Toggle Layout Direction');
      rtlBtn.textContent = document.documentElement.getAttribute('dir') === 'rtl' ? 'LTR' : 'RTL';
      rtlBtn.style.cssText = [
        'width:44px', 'height:44px', 'flex:0', 'border-radius:50%',
        'border:1px solid var(--border)', 'background:var(--surface)',
        'color:var(--text-primary)', 'cursor:pointer',
        'font-family:var(--font-sans)', 'font-size:11px', 'font-weight:520',
        'text-transform:uppercase', 'letter-spacing:0.06em', 'transition:var(--transition)', 'flex-shrink:0'
      ].join(';');

      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark ? 'dark' : 'light');
      });

      rtlBtn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyLayoutDirection(nextDir);
        localStorage.setItem('layout-direction', nextDir);
      });

      row.appendChild(themeBtn);
      row.appendChild(rtlBtn);

      /* Sign Up button */
      const signupLink = document.createElement('a');
      signupLink.href = 'signup.html';
      signupLink.className = 'signup-btn';
      signupLink.textContent = 'Sign Up';
      signupLink.style.cssText = [
        'display:flex', 'align-items:center', 'justify-content:center',
        'height:44px', 'border-radius:40px',
        'background:var(--primary)', 'color:#FAF8F3',
        'font-family:var(--font-sans)', 'font-size:13px', 'font-weight:520',
        'text-transform:uppercase', 'letter-spacing:0.06em',
        'text-decoration:none', 'transition:var(--transition)'
      ].join(';');

      controls.appendChild(row);
      controls.appendChild(signupLink);
      mobileNav.appendChild(controls);

      /* Keep new theme icon in sync after injection */
      updateThemeIcons(document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }

    /* â”€â”€ Open / close helpers â”€â”€ */
    function openMobileNav() {
      mobileNav.classList.add('open');
      hamburger.classList.add('active');
      document.body.classList.add('nav-open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    }

    function closeMobileNav() {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.classList.remove('nav-open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }

    hamburger.addEventListener('click', () => {
      mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
    });

    /* Close drawer on any nav-link click */
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }
}

/* Scroll Animations using Intersection Observer */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

/* FAQ Accordion Toggle */
function initFAQ() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all FAQs first
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Tabs Component for Product Details Page */
function initProductDetailsTabs() {
  const headers = document.querySelectorAll('.tab-header');
  const contents = document.querySelectorAll('.tab-content');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const tabId = header.getAttribute('data-tab');

      headers.forEach(h => h.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      header.classList.add('active');
      const targetContent = document.getElementById(tabId);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

/* Image Gallery Switcher for Product Details Page */
function initGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImg = document.querySelector('.gallery-main img');

  if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = thumb.querySelector('img').src;
      });
    });
  }
}

/* Subscription Interactive pricing builder */
function initSubscriptionBuilder() {
  const intervalRadios = document.querySelectorAll('input[name="sub-interval"]');
  const tierPrices = document.querySelectorAll('.tier-price');

  if (intervalRadios.length && tierPrices.length) {
    intervalRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        const factor = radio.value === 'biweekly' ? 0.85 : 1.0; // 15% discount for bi-weekly frequency

        tierPrices.forEach(priceEl => {
          const basePrice = parseFloat(priceEl.getAttribute('data-base'));
          const finalPrice = (basePrice * factor).toFixed(2);
          priceEl.textContent = `$${finalPrice}`;
        });
      });
    });
  }
}

/* Recipe Category Filter */
function initRecipeFilter() {
  const tags = document.querySelectorAll('.recipe-tag-filter');
  const cards = document.querySelectorAll('.recipe-card');

  if (tags.length && cards.length) {
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const category = tag.getAttribute('data-category');

        cards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

/* Pet Matcher Interactive Quiz */
function initGutQuiz() {
  const quizForm = document.getElementById('gut-quiz-form');
  const quizResult = document.getElementById('quiz-result');

  if (quizForm && quizResult) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const goals = Array.from(quizForm.querySelectorAll('input[name="goal"]:checked')).map(el => el.value);
      const experience = quizForm.querySelector('input[name="experience"]:checked')?.value;

      let suggestion = "Premium Bird Seed & Cage Kit";
      let description = "Based on your selections, we suggest starting with our premium nutritional seed mixes and habitat enclosures to keep your feathered friends thriving.";

      if (experience === 'beginner') {
        suggestion = "Cozy Cat & Dog Comfort Bundle";
        description = "For dogs and cats, we suggest our premium soft beds, chew toys, and healthy nutritional treats designed for their comfort and active lifestyle.";
      } else if (goals.includes('energy') || goals.includes('digest')) {
        suggestion = "Active Play & Wellness Bundle";
        description = "Keep your pets energetic with our premium grain-free food and interactive toys that stimulate physical play and support optimal health.";
      } else if (goals.includes('spice')) {
        suggestion = "Professional Spa & Grooming Kit";
        description = "Pamper your pet at home! This kit includes organic pet shampoo, shedding brushes, and claw trimmers to keep them looking clean and smelling fresh.";
      }

      quizResult.innerHTML = `
        <div style="background-color: var(--bg-secondary); padding: 32px; border-radius: 12px; border: 1px solid var(--primary); text-align: center; animation: fadeIn 0.5s ease;">
          <span style="text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em; color: var(--secondary); font-weight: bold;">Your Recommended Product</span>
          <h3 style="margin: 12px 0; font-family: var(--font-serif); font-size: 32px; color: var(--primary); font-weight: 540;">${suggestion}</h3>
          <p style="margin-bottom: 24px;">${description}</p>
          <div style="display: flex; justify-content: center; gap: 16px;">
            <a href="dogs.html" class="btn btn-primary">Shop Our Store</a>
            <a href="grooming.html" class="btn btn-secondary">Book Grooming</a>
          </div>
        </div>
      `;
    });
  }
}

/* Password Visibility Toggles */
function initPasswordToggles() {
  const toggles = document.querySelectorAll('.password-toggle-btn');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input && input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.815 7.815L19.5 19.5m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        `;
      } else if (input) {
        input.type = 'password';
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        `;
      }
    });
  });
}

/* Scroll to Top Button */
function initScrollTopButton() {
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.id = 'scrollTopBtn';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  `;
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* Dropdown Click Toggles */
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();

        // Close other dropdowns
        dropdowns.forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });

        dropdown.classList.toggle('active');
        const isActive = dropdown.classList.contains('active');
        toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });
    }
  });

  // Close on click outside
  document.addEventListener('click', () => {
    dropdowns.forEach(d => {
      d.classList.remove('active');
      const toggle = d.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
