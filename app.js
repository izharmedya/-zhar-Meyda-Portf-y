/* ==========================================================================
   İzhar Medya — Application Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initMediaDecks();
  initRails();
});

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Menu
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const dropdown = document.getElementById('mobileDropdown');

  if (btn && dropdown) {
    const setOpen = (open) => {
      dropdown.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', String(open));
    };

    btn.addEventListener('click', () => {
      setOpen(dropdown.classList.contains('hidden'));
    });

    // Close on navigation link click
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        setOpen(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.classList.contains('hidden') && !dropdown.contains(event.target) && !btn.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !dropdown.classList.contains('hidden')) {
        setOpen(false);
        btn.focus();
      }
    });
  }
}

// Build the same three-layer card hierarchy as the reference: an outer folder
// shell, a white inner card, and a separate frosted panel over its lower edge.
function initMediaDecks() {
  document.querySelectorAll('.media-card').forEach(card => {
    if (card.querySelector('.media-card-frame')) return;

    const frame = document.createElement('div');
    frame.className = 'media-card-frame';
    const inner = document.createElement('div');
    inner.className = 'media-card-inner';
    const blurPanel = document.createElement('div');
    blurPanel.className = 'media-card-blur';

    const badge = card.querySelector('.media-badge');
    const caption = document.createElement('div');
    caption.className = 'media-card-caption';
    const byline = document.createElement('span');
    byline.textContent = 'by İzhar Medya';
    const format = document.createElement('span');
    format.textContent = badge?.textContent?.trim() || '9:16';
    caption.append(byline, format);

    while (card.firstChild) inner.appendChild(card.firstChild);
    frame.append(inner, blurPanel);
    card.append(frame, caption);
  });
}

// Modal Video Player
const modal = document.getElementById('videoModal');
const modalPlayer = document.getElementById('modalVideoPlayer');
const modalSource = document.getElementById('modalVideoSource');
let lastFocusedElement = null;

function showModal() {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const closeButton = modal.querySelector('.modal-close-btn');
  if (closeButton) requestAnimationFrame(() => closeButton.focus());
}

// Open MP4 Modal — sadece video; başlık/meta/dış link gösterilmiyor,
// parametreler geriye dönük uyumluluk için duruyor.
function openModal(videoSrc, title, meta, externalUrl) {
  if (!modal || !modalPlayer) return;

  const iframe = document.getElementById('modalIframePlayer');
  if (iframe) {
    iframe.src = '';
    iframe.classList.add('hidden');
  }

  const container = modal.querySelector('.modal-container');
  if (container) container.classList.remove('modal-vertical');

  modalPlayer.classList.remove('hidden');
  modalSource.src = videoSrc;
  modalPlayer.load();
  showModal();
  
  modalPlayer.play().catch(e => {
    console.log('Autoplay pending:', e);
  });
}

// Open YouTube / Instagram Embed Modal (dikey, genişletilmiş ekran)
function openEmbedModal(embedSrc, title, meta, externalUrl) {
  if (!modal) return;

  if (modalPlayer) {
    modalPlayer.pause();
    if (modalSource) modalSource.src = '';
    modalPlayer.classList.add('hidden');
  }

  let iframe = document.getElementById('modalIframePlayer');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'modalIframePlayer';
    iframe.className = 'modal-iframe';
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', 'true');
    document.querySelector('.modal-body').appendChild(iframe);
  }
  iframe.title = title;
  iframe.classList.remove('hidden');
  iframe.src = embedSrc;

  const container = modal.querySelector('.modal-container');
  if (container) container.classList.add('modal-vertical');

  showModal();
}

function closeModal() {
  if (!modal) return;
  if (modalPlayer) {
    modalPlayer.pause();
    if (modalSource) modalSource.src = '';
    modalPlayer.classList.add('hidden');
  }
  const iframe = document.getElementById('modalIframePlayer');
  if (iframe) {
    iframe.src = '';
    iframe.classList.add('hidden');
  }
  const container = modal.querySelector('.modal-container');
  if (container) container.classList.remove('modal-vertical');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

function handleBackdropClick(event) {
  if (event.target === modal) {
    closeModal();
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
    closeModal();
  }

  if (e.key === 'Tab' && modal && !modal.classList.contains('hidden')) {
    const focusable = Array.from(modal.querySelectorAll('button, a[href], video[controls], [tabindex]:not([tabindex="-1"])'))
      .filter(element => !element.hasAttribute('disabled'));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});


// ==========================================================================
// Yatay Kaydırmalı Şerit (Rail) — manuel kaydırma, sürükleme ve ok kontrolü.
// ==========================================================================

// Ok tuşu: iki kart genişliği + boşluk kadar kaydırır.
function railScroll(railId, direction) {
  const rail = document.getElementById(railId);
  if (!rail) return;

  const card = rail.querySelector('.rail-card');
  const gap = parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap) || 18;
  const step = card ? (card.offsetWidth + gap) * 2 : rail.clientWidth * 0.8;

  rail.scrollBy({ left: step * direction, behavior: 'smooth' });
}

function initRails() {
  document.querySelectorAll('.rail-wrap').forEach(wrap => {
    // .rail gerçek şerit; grid'ler mobilde CSS ile şeride dönüştüğü için onlar da sayılır.
    const rail = wrap.querySelector('.rail, .media-grid');
    const prev = wrap.querySelector('.rail-prev');
    const next = wrap.querySelector('.rail-next');
    if (!rail) return;

    // Kaydırma ipucu satırı (yalnızca gerçekten taşan şeritlerde CSS ile görünür).
    const hint = document.createElement('div');
    hint.className = 'rail-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.innerHTML = 'KAYDIR <i></i>';
    wrap.appendChild(hint);

    const cards = Array.from(rail.querySelectorAll('.rail-card, .media-card'));
    if (cards.length === 0) return;

    const sectionTitle = rail.getAttribute('aria-label') || wrap.getAttribute('aria-label') || wrap.closest('section')?.querySelector('h2')?.textContent?.trim() || 'Video seçkisi';
    rail.setAttribute('aria-label', sectionTitle);

    cards.forEach(card => {
      const title = card.querySelector('.rail-title, h3')?.textContent?.trim() || 'Video';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${title} videosunu aç`);
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          card.click();
        }
      });
    });

    function updateNavigation() {
      const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const solVar = rail.scrollLeft > 6;
      const sagVar = rail.scrollLeft < maxScroll - 6;
      if (prev) prev.disabled = !solVar;
      if (next) next.disabled = !sagVar;
      // Kenar solmaları + ipucu görünürlüğü
      wrap.classList.toggle('is-scrollable', maxScroll > 6);
      wrap.classList.toggle('can-left', solVar);
      wrap.classList.toggle('can-right', sagVar);
    }

    rail.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);
    requestAnimationFrame(updateNavigation);

    // Masaüstünde fareyle tutup sürükleyerek de kaydırma (elle çevirme).
    let isDragging = false;
    let dragMoved = false;
    let startX = 0;
    let startScrollLeft = 0;

    rail.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      isDragging = true;
      dragMoved = false;
      startX = e.clientX;
      startScrollLeft = rail.scrollLeft;
      rail.classList.add('rail-dragging');
    });

    rail.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      if (Math.abs(delta) > 4) dragMoved = true;
      rail.scrollLeft = startScrollLeft - delta;
    });

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      rail.classList.remove('rail-dragging');
      updateNavigation();
    }
    rail.addEventListener('pointerup', endDrag);
    rail.addEventListener('pointerleave', endDrag);

    // Sürükleme bir tıklama gibi algılanıp video modalını açmasın diye,
    // sürükleme gerçekleştiyse hemen sonraki click event'i bastırılır.
    rail.addEventListener('click', (e) => {
      if (dragMoved) {
        e.preventDefault();
        e.stopPropagation();
        dragMoved = false;
      }
    }, true);

  });
}
