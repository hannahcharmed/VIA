/* ============================================================
   VIA — Shared App Logic
   ============================================================ */

// ── NAV ──────────────────────────────────────────────────────
function initNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer    = document.getElementById('nav-drawer');
  if (!hamburger || !drawer) return;
  hamburger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
  // Update avatar + role-aware dashboard link
  const user = VIA_STATE.user;
  if (user) {
    document.querySelectorAll('.nav-avatar').forEach(el => {
      el.style.backgroundImage = user.avatar ? `url(${user.avatar})` : '';
      el.style.display = 'block';
    });
    document.querySelectorAll('.nav-signin').forEach(el => el.style.display = 'none');
    const dashUrl = user.role === 'owner' ? 'owner.html' : user.role === 'traveler' ? 'traveler.html' : 'dashboard.html';
    document.querySelectorAll('.nav-dashboard').forEach(el => {
      el.href = dashUrl;
      el.style.display = '';
    });
  }
  initNotifications();
}

// ── NOTIFICATIONS ─────────────────────────────────────────────
const MOCK_NOTIFS = [
  { icon: '✦', text: 'Your trade with <strong>Rua Dos Anjos</strong> was confirmed', time: '2h ago', url: 'messages.html' },
  { icon: '€', text: '<strong>Sarah M.</strong> booked Hôtel Le Pigonnet — you earned €119', time: '1d ago', url: 'dashboard.html' },
  { icon: '✓', text: 'Your IG Reel was <strong>approved</strong> by Marta Rocha', time: '2d ago', url: 'dashboard.html' },
  { icon: '★', text: 'New trade available: <strong>Casa Mira, Barcelona</strong>', time: '3d ago', url: 'explore.html' },
];

function initNotifications() {
  if (!VIA_STATE.user) return;
  const navRight = document.querySelector('.nav-right');
  if (!navRight || navRight.querySelector('.nav-bell')) return;

  const bell = document.createElement('button');
  bell.className = 'nav-bell';
  bell.setAttribute('aria-label', 'Notifications');
  bell.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><span class="nav-bell-badge">4</span>`;
  navRight.insertBefore(bell, navRight.firstChild);

  const dropdown = document.createElement('div');
  dropdown.className = 'notif-dropdown';
  dropdown.innerHTML = `<div class="notif-dropdown-header"><span>Notifications</span><button onclick="clearAllNotifs()" style="font-size:11px;color:var(--muted);background:none;border:none;cursor:pointer;font-family:inherit">Mark all read</button></div>` +
    MOCK_NOTIFS.map(n => `<a class="notif-item" href="${n.url}"><div class="notif-item-icon">${n.icon}</div><div><div class="notif-item-text">${n.text}</div><div class="notif-item-time">${n.time}</div></div></a>`).join('');
  document.body.appendChild(dropdown);

  bell.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dropdown.classList.toggle('open');
    bell.classList.toggle('active', open);
    if (open) {
      const rect = bell.getBoundingClientRect();
      dropdown.style.top   = (rect.bottom + 8) + 'px';
      dropdown.style.right = Math.max(8, window.innerWidth - rect.right) + 'px';
      dropdown.style.left  = 'auto';
    }
  });

  document.addEventListener('click', (e) => {
    if (!bell.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      bell.classList.remove('active');
    }
  });
}

function clearAllNotifs() {
  const badge = document.querySelector('.nav-bell-badge');
  if (badge) badge.style.display = 'none';
  document.querySelectorAll('.notif-item').forEach(el => el.classList.add('read'));
  showToast('All notifications marked as read');
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.scroll-reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ── CHIP TOGGLE ──────────────────────────────────────────────
function toggleChip(chip) { chip.classList.toggle('selected'); }

// ── TOAST ─────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, duration = 3000) {
  let t = document.getElementById('via-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'via-toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

// ── MODAL ─────────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  el.addEventListener('click', (e) => { if (e.target === el) closeModal(id); }, { once: false });
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// ── TABS ─────────────────────────────────────────────────────
function initTabs(containerSelector, onChange) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        // Hide/show panels
        const panelGroup = btn.closest('.tab-group') || btn.closest('section') || document;
        panelGroup.querySelectorAll('.tab-panel').forEach(p => {
          p.style.display = p.dataset.panel === tab ? '' : 'none';
        });
        if (onChange) onChange(tab, btn);
      });
    });
  });
}

// ── FILTER CHIPS ─────────────────────────────────────────────
function initFilterChips(onFilter) {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.dataset.group;
      if (group) {
        document.querySelectorAll(`.filter-chip[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
      }
      chip.classList.toggle('active');
      if (onFilter) onFilter();
    });
  });
}

// ── GALLERY ──────────────────────────────────────────────────
function initGallery(galleryEl) {
  if (!galleryEl) return;
  const dots = galleryEl.parentElement && galleryEl.parentElement.querySelector('.gallery-dots');
  const items = galleryEl.querySelectorAll('.gallery-item');
  if (!items.length) return;

  let current = 0;
  function updateDots(idx) {
    if (!dots) return;
    dots.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  // Build dots
  if (dots) {
    dots.innerHTML = '';
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Image ${i + 1}`);
      d.addEventListener('click', () => {
        items[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      });
      dots.appendChild(d);
    });
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = Array.from(items).indexOf(e.target);
        if (idx !== -1) { current = idx; updateDots(idx); }
      }
    });
  }, { root: galleryEl, threshold: 0.6 });
  items.forEach(item => obs.observe(item));
}

// ── WISHLIST ─────────────────────────────────────────────────
function initWishlistButtons() {
  document.querySelectorAll('[data-wishlist]').forEach(btn => {
    const id = parseInt(btn.dataset.wishlist);
    btn.classList.toggle('saved', VIA_STATE.isWishlisted(id));
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const added = VIA_STATE.toggleWishlist(id);
      btn.classList.toggle('saved', added);
      // Update heart icon
      const svg = btn.querySelector('svg');
      if (svg) svg.style.fill = added ? 'currentColor' : 'none';
      showToast(added ? '♥ Saved to wishlist' : 'Removed from wishlist');
    });
    // Init icon
    const svg = btn.querySelector('svg');
    if (svg) svg.style.fill = VIA_STATE.isWishlisted(id) ? 'currentColor' : 'none';
  });
}

// ── CALENDAR ─────────────────────────────────────────────────
function createCalendar(container, opts = {}) {
  const today = new Date();
  today.setHours(0,0,0,0);
  let viewYear  = today.getFullYear();
  let viewMonth = today.getMonth();
  let start = opts.start || null;
  let end   = opts.end   || null;

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  function render() {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrev  = new Date(viewYear, viewMonth, 0).getDate();

    let html = `
      <div class="calendar-header">
        <button class="cal-nav" id="cal-prev" aria-label="Previous month">‹</button>
        <div class="calendar-month">${MONTHS[viewMonth]} ${viewYear}</div>
        <button class="cal-nav" id="cal-next" aria-label="Next month">›</button>
      </div>
      <div class="calendar-grid">
        ${DAYS.map(d => `<div class="cal-dow">${d}</div>`).join('')}
    `;

    // Prev month days
    for (let i = firstDay - 1; i >= 0; i--) {
      html += `<button class="cal-day other-month" disabled>${daysInPrev - i}</button>`;
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      date.setHours(0,0,0,0);
      const isPast = date < today;
      let cls = 'cal-day';
      if (start && date.getTime() === start.getTime()) cls += ' start';
      if (end   && date.getTime() === end.getTime())   cls += ' end';
      if (start && end && date > start && date < end)  cls += ' in-range';
      html += `<button class="cal-day ${cls}" data-date="${date.toISOString()}" ${isPast ? 'disabled' : ''}>${d}</button>`;
    }
    // Next month fill
    const remaining = 42 - firstDay - daysInMonth;
    for (let d = 1; d <= Math.min(remaining, 14); d++) {
      html += `<button class="cal-day other-month" disabled>${d}</button>`;
    }

    html += '</div>';
    container.innerHTML = html;
    container.querySelector('#cal-prev').addEventListener('click', () => { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } render(); });
    container.querySelector('#cal-next').addEventListener('click', () => { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } render(); });
    container.querySelectorAll('.cal-day:not(.other-month):not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        const clicked = new Date(btn.dataset.date);
        if (!start || (start && end)) { start = clicked; end = null; }
        else if (clicked <= start) { start = clicked; end = null; }
        else { end = clicked; }
        render();
        if (opts.onChange) opts.onChange(start, end);
      });
    });
  }

  render();
  return { getStart: () => start, getEnd: () => end };
}

// ── FORM VALIDATION ───────────────────────────────────────────
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'var(--error)';
      valid = false;
    } else {
      input.style.borderColor = '';
    }
  });
  return valid;
}

// ── PRICE FORMAT ─────────────────────────────────────────────
function formatCurrency(amount, currency = '€') {
  return `${currency}${Number(amount).toLocaleString()}`;
}

// ── URL PARAMS ────────────────────────────────────────────────
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ── AUTH GUARD ────────────────────────────────────────────────
function requireAuth(redirectUrl = 'auth.html') {
  if (!VIA_STATE.user) {
    window.location.href = `${redirectUrl}?next=${encodeURIComponent(window.location.href)}`;
    return false;
  }
  return true;
}

// ── STAY CARD HTML ────────────────────────────────────────────
function renderStayCard(stay, creator) {
  const wishlisted = VIA_STATE.isWishlisted(stay.id);
  return `
    <div class="stay-card" onclick="window.location='stay.html?id=${stay.id}'">
      <div class="stay-card-img" style="background-image:url('${stay.images[0]}')">
        <button class="stay-card-save${wishlisted ? ' saved' : ''}" data-wishlist="${stay.id}" aria-label="Save to wishlist">
          <svg viewBox="0 0 24 24" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        ${creator ? `
        <div class="stay-card-creator-badge">
          <div class="badge-avatar" style="background-image:url('${creator.avatar}')"></div>
          <span class="badge-name">${creator.handle}</span>
        </div>` : ''}
      </div>
      <div class="stay-card-body">
        <div class="stay-card-meta">
          <div class="stay-card-name">${stay.name}</div>
          <div class="stay-card-rating"><span class="star">★</span> ${stay.rating}</div>
        </div>
        <div class="stay-card-location">${stay.location}</div>
        <div class="stay-card-price">
          <span class="price-amount">${stay.currency}${stay.price.toLocaleString()}</span>
          <span class="price-unit">/ night</span>
        </div>
      </div>
    </div>
  `;
}

// ── CREATOR CARD HTML ─────────────────────────────────────────
function renderCreatorCard(creator) {
  const stays = getStaysByCreator(creator.id);
  return `
    <div class="creator-card" onclick="window.location='creator.html?id=${creator.id}'">
      <div class="creator-card-cover" style="background-image:url('${creator.cover}')"></div>
      <div class="creator-card-body">
        <div class="creator-card-top">
          <div class="creator-card-avatar" style="background-image:url('${creator.avatar}')"></div>
          <div class="via-badge">Via Creator</div>
        </div>
        <div class="creator-card-name">${creator.name}</div>
        <div class="creator-card-handle">${creator.handle} · ${creator.followers} followers</div>
        <div class="creator-card-pills">
          ${creator.locations.slice(0, 3).map(l => `<span class="pill">${l}</span>`).join('')}
          ${creator.locations.length > 3 ? `<span class="pill">+${creator.locations.length - 3}</span>` : ''}
        </div>
        <div class="creator-card-stats">
          <div class="stat-item"><div class="stat-num">${stays.length}</div><div class="stat-label">Stays</div></div>
          <div class="stat-item"><div class="stat-num">${creator.stats.avgBooking}</div><div class="stat-label">Avg booking</div></div>
          <div class="stat-item"><div class="stat-num">${creator.stats.matchRate}</div><div class="stat-label">Match rate</div></div>
        </div>
      </div>
    </div>
  `;
}

// ── SWIPE-TO-ACT ──────────────────────────────────────────────
// Wraps an element in swipe-card-wrap and reveals approve/decline actions.
// onApprove / onDecline are callbacks called after the swipe settles.
function initSwipeCard(el, { onApprove, onDecline } = {}) {
  const THRESHOLD = 72; // px before action fires

  const wrap = document.createElement('div');
  wrap.className = 'swipe-card-wrap';

  const approveReveal = document.createElement('div');
  approveReveal.className = 'swipe-card-reveal swipe-reveal-approve';
  approveReveal.innerHTML = '<span class="swipe-reveal-label approve">✓ Approve</span>';

  const declineReveal = document.createElement('div');
  declineReveal.className = 'swipe-card-reveal swipe-reveal-decline';
  declineReveal.innerHTML = '<span class="swipe-reveal-label decline">✗ Decline</span>';

  el.parentNode.insertBefore(wrap, el);
  el.classList.add('swipe-card-inner');
  wrap.appendChild(approveReveal);
  wrap.appendChild(declineReveal);
  wrap.appendChild(el);

  let startX = 0, currentX = 0, dragging = false;

  function onPointerDown(e) {
    if (e.touches) {
      startX = e.touches[0].clientX;
    } else {
      startX = e.clientX;
    }
    dragging = true;
    el.classList.add('dragging');
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    currentX = x - startX;
    el.style.transform = `translateX(${currentX}px)`;
    const ratio = Math.abs(currentX) / THRESHOLD;
    const labelEl = currentX > 0
      ? approveReveal.querySelector('.swipe-reveal-label')
      : declineReveal.querySelector('.swipe-reveal-label');
    const otherEl = currentX > 0
      ? declineReveal.querySelector('.swipe-reveal-label')
      : approveReveal.querySelector('.swipe-reveal-label');
    if (labelEl) labelEl.style.opacity = Math.min(1, ratio);
    if (otherEl) otherEl.style.opacity = 0;
    if (e.touches) e.preventDefault();
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    el.classList.remove('dragging');
    const fired = Math.abs(currentX) >= THRESHOLD;
    if (fired && currentX > 0 && onApprove) {
      el.style.transform = `translateX(110%)`;
      setTimeout(() => { wrap.style.display = 'none'; onApprove(); }, 280);
    } else if (fired && currentX < 0 && onDecline) {
      el.style.transform = `translateX(-110%)`;
      setTimeout(() => { wrap.style.display = 'none'; onDecline(); }, 280);
    } else {
      el.style.transform = '';
      approveReveal.querySelector('.swipe-reveal-label').style.opacity = 0;
      declineReveal.querySelector('.swipe-reveal-label').style.opacity = 0;
    }
    currentX = 0;
  }

  el.addEventListener('touchstart', onPointerDown, { passive: true });
  el.addEventListener('touchmove', onPointerMove, { passive: false });
  el.addEventListener('touchend', onPointerUp);
  el.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
}

// ── BOTTOM TAB BAR ────────────────────────────────────────────
// Activate the correct tab based on the current panel.
function initBottomTabBar(tabBarId, panelSwitchFn) {
  const bar = document.getElementById(tabBarId);
  if (!bar) return;
  bar.querySelectorAll('.bottom-tab-item[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.dataset.panel;
      if (panel === '_explore') { window.location.href = 'explore.html'; return; }
      if (panel === '_messages') { window.location.href = 'messages.html'; return; }
      bar.querySelectorAll('.bottom-tab-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (panelSwitchFn) panelSwitchFn(panel);
    });
  });
}

// ── ONBOARDING SUCCESS ────────────────────────────────────────
function showOnboardSuccess(name, role, redirectUrl) {
  const overlay = document.createElement('div');
  overlay.className = 'onboard-success';
  overlay.innerHTML = `
    <div class="onboard-success-via">VIA</div>
    <div class="onboard-success-check">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <div class="onboard-success-title">You're <em>in.</em></div>
    <p class="onboard-success-sub">Welcome to Via, ${name}.<br>Your ${role} profile is ready.</p>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('show')));
  setTimeout(() => { window.location.href = redirectUrl; }, 2600);
}

// ── IMAGE UPLOAD (native camera) ──────────────────────────────
function initImageUpload(inputId, previewId, labelId) {
  const input   = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  const label   = document.getElementById(labelId);
  if (!input) return null;

  let dataUrl = null;

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      dataUrl = e.target.result;
      if (preview) {
        preview.style.backgroundImage = `url('${dataUrl}')`;
        preview.style.display = 'block';
      }
      if (label) label.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  return {
    getDataUrl: () => dataUrl,
    clear: () => {
      dataUrl = null;
      input.value = '';
      if (preview) { preview.style.backgroundImage = ''; preview.style.display = 'none'; }
      if (label) label.style.display = '';
    }
  };
}

// ── PWA REGISTRATION ─────────────────────────────────────────
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initSmoothScroll();
  initWishlistButtons();
  registerSW();
});
