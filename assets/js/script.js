// Script Principal — Consultório Dra. Nataly Nunes
// Gestão de Cookies (LGPD + Google Consent Mode v2), Interatividade e Acessibilidade

document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
  initSmoothScroll();
});

// Google Consent Mode v2 + Cookie Banner Logic
function initCookieConsent() {
  const banner = document.getElementById('cookie-consent-bar');
  const btnAccept = document.getElementById('cookie-accept-btn');
  const btnReject = document.getElementById('cookie-reject-btn');
  const btnManage = document.getElementById('cookie-manage-btn');

  if (!banner) return;

  const savedConsent = localStorage.getItem('cookie_consent');

  if (!savedConsent) {
    showBanner(banner);
  } else if (savedConsent === 'granted') {
    applyConsent('granted');
    banner.classList.add('hidden');
    banner.classList.remove('flex');
  } else {
    applyConsent('denied');
    banner.classList.add('hidden');
    banner.classList.remove('flex');
  }

  if (btnAccept) {
    btnAccept.addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'granted');
      applyConsent('granted');
      hideBanner(banner);
    });
  }

  if (btnReject) {
    btnReject.addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'denied');
      applyConsent('denied');
      hideBanner(banner);
    });
  }

  if (btnManage) {
    btnManage.addEventListener('click', () => {
      showBanner(banner);
      btnReject?.focus();
    });
  }
}

function applyConsent(status) {
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      'ad_storage': status,
      'ad_user_data': status,
      'ad_personalization': status,
      'analytics_storage': status
    });
  }
}

function hideBanner(banner) {
  banner.classList.add('opacity-0', 'translate-y-full');
  setTimeout(() => {
    banner.classList.add('hidden');
    banner.classList.remove('flex');
  }, 300);
}

function showBanner(banner) {
  banner.classList.remove('hidden', 'opacity-0', 'translate-y-full');
  banner.classList.add('flex');
}

// Smooth scroll helper
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
