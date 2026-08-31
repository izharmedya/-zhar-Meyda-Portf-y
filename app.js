/* ==========================================================================
   İzhar Medya — Application Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initPixelCanvas();
});

// ==========================================================================
// Authentic Retro Atari / 8-Bit Arcade Pixel Engine
// ==========================================================================
function initPixelCanvas() {
  const canvas = document.getElementById('pixelCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  let width, height;
  let bgImage = new Image();
  bgImage.src = 'assets/hero-bg.png';

  let isLoaded = false;
  bgImage.onload = () => {
    isLoaded = true;
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Pixel Grid Size (chunky 8-bit stepping)
  const PIXEL_SCALE = 4;

  // 1. Classic 8-Bit Flapping Pixel Birds (3-frame Atari sprites)
  const birdSprites = [
    // Frame 0: Wings Up
    [
      "  #       #  ",
      " # #     # # ",
      "#   #   #   #",
      "     ###     ",
      "      #      "
    ],
    // Frame 1: Wings Flat
    [
      "             ",
      "#############",
      "     ###     ",
      "      #      ",
      "             "
    ],
    // Frame 2: Wings Down
    [
      "             ",
      "     ###     ",
      "#   #   #   #",
      " # #     # # ",
      "  #       #  "
    ]
  ];

  const birds = [
    { x: -40, y: height * 0.18, speed: 1.5, frame: 0, scale: 3, animTimer: 0 },
    { x: -180, y: height * 0.26, speed: 1.2, frame: 1, scale: 2.5, animTimer: 5 }
  ];

  // 2. Chunky 8-bit Stepped Clouds
  const clouds = [
    { x: -100, y: height * 0.08, width: 140, height: 40, speed: 0.35 },
    { x: width * 0.45, y: height * 0.05, width: 200, height: 50, speed: 0.25 },
    { x: width * 0.8, y: height * 0.16, width: 120, height: 35, speed: 0.4 }
  ];

  // 3. 8-Bit Twinkling Sparkles (4-frame star loop)
  const sparkleSprites = [
    [" # ", "###", " # "],
    ["  #  ", " ### ", "#####", " ### ", "  #  "],
    [" # ", "###", " # "],
    ["   ", " # ", "   "]
  ];

  const sparkles = [
    { x: width * 0.65, y: height * 0.22, frame: 0, timer: 0 },
    { x: width * 0.82, y: height * 0.14, frame: 2, timer: 10 },
    { x: width * 0.45, y: height * 0.42, frame: 1, timer: 20 },
    { x: width * 0.72, y: height * 0.65, frame: 3, timer: 15 }
  ];

  // Helper to draw quantized pixel matrix
  function drawPixelMatrix(matrix, startX, startY, pixelSize, color) {
    ctx.fillStyle = color;
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] === '#') {
          // Snap strictly to pixel grid
          const px = Math.floor((startX + c * pixelSize) / PIXEL_SCALE) * PIXEL_SCALE;
          const py = Math.floor((startY + r * pixelSize) / PIXEL_SCALE) * PIXEL_SCALE;
          ctx.fillRect(px, py, pixelSize, pixelSize);
        }
      }
    }
  }

  // Quantized Retro Game Loop (updates in discrete steps, no smooth mouse drift)
  let lastTime = 0;
  const RETRO_FPS = 12; // Authentic 12 FPS game update rate
  const frameInterval = 1000 / RETRO_FPS;

  let gameTick = 0;

  function render(currentTime) {
    requestAnimationFrame(render);

    const delta = currentTime - lastTime;
    if (delta < frameInterval) return;
    lastTime = currentTime - (delta % frameInterval);

    gameTick++;

    // 1. Draw static pixel background (Crisp, no mouse shaking)
    if (isLoaded) {
      const imgRatio = bgImage.width / bgImage.height;
      const canvasRatio = width / height;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawW = width;
        drawH = drawW / imgRatio;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = drawH * imgRatio;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(bgImage, drawX, drawY, drawW, drawH);
    } else {
      ctx.fillStyle = '#6BA3C8';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. 8-Bit Stepped Pixel Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    clouds.forEach(cloud => {
      cloud.x += cloud.speed * PIXEL_SCALE;
      if (cloud.x > width + 100) {
        cloud.x = -cloud.width - 60;
      }

      // Snap to whole pixel grid
      const cx = Math.floor(cloud.x / PIXEL_SCALE) * PIXEL_SCALE;
      const cy = Math.floor(cloud.y / PIXEL_SCALE) * PIXEL_SCALE;
      const cw = Math.floor(cloud.width / PIXEL_SCALE) * PIXEL_SCALE;
      const ch = Math.floor(cloud.height / PIXEL_SCALE) * PIXEL_SCALE;

      // Chunky blocky steps
      ctx.fillRect(cx, cy + ch * 0.35, cw, ch * 0.65);
      ctx.fillRect(cx + cw * 0.15, cy + ch * 0.15, cw * 0.7, ch * 0.85);
      ctx.fillRect(cx + cw * 0.3, cy, cw * 0.4, ch);
    });

    // 3. Atari Flying Birds (Step-by-step Flapping Animation)
    birds.forEach(bird => {
      bird.x += bird.speed * PIXEL_SCALE;
      if (bird.x > width + 50) {
        bird.x = -80;
        bird.y = Math.random() * (height * 0.35) + height * 0.08;
      }

      // Change sprite frame every 2 game ticks
      bird.animTimer++;
      if (bird.animTimer % 2 === 0) {
        bird.frame = (bird.frame + 1) % birdSprites.length;
      }

      const sprite = birdSprites[bird.frame];
      const bx = Math.floor(bird.x / PIXEL_SCALE) * PIXEL_SCALE;
      const by = Math.floor(bird.y / PIXEL_SCALE) * PIXEL_SCALE;
      drawPixelMatrix(sprite, bx, by, bird.scale, 'rgba(40, 50, 70, 0.75)');
    });

    // 4. Retro 8-bit Twinkling Sparkles on Meadow & Sun
    sparkles.forEach(s => {
      s.timer++;
      if (s.timer % 3 === 0) {
        s.frame = (s.frame + 1) % sparkleSprites.length;
      }

      const sprite = sparkleSprites[s.frame];
      const sx = Math.floor(s.x / PIXEL_SCALE) * PIXEL_SCALE;
      const sy = Math.floor(s.y / PIXEL_SCALE) * PIXEL_SCALE;
      drawPixelMatrix(sprite, sx, sy, 3, 'rgba(255, 255, 220, 0.85)');
    });
  }

  requestAnimationFrame(render);
}

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
    btn.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });

    // Close on navigation link click
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.add('hidden');
      });
    });
  }
}

// Accordion Toggle
function toggleAccordion(button) {
  const item = button.closest('.accordion-item');
  const container = item.parentElement;
  const isActive = item.classList.contains('active');

  // Close other items in the same container
  container.querySelectorAll('.accordion-item').forEach(el => {
    el.classList.remove('active');
  });

  if (!isActive) {
    item.classList.add('active');
  }
}

// Gallery Filter
function filterGallery(category, button) {
  // Update button active states
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  // Filter video cards
  const cards = document.querySelectorAll('.video-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Inline Video Player Toggle
function toggleInlinePlay(videoId, button) {
  const video = document.getElementById(videoId);
  if (!video) return;

  if (video.paused) {
    // Pause other videos first
    document.querySelectorAll('video').forEach(v => {
      if (v !== video) v.pause();
    });
    video.play();
    button.style.opacity = '0';
  } else {
    video.pause();
    button.style.opacity = '1';
  }

  video.addEventListener('ended', () => {
    button.style.opacity = '1';
  });

  video.addEventListener('pause', () => {
    button.style.opacity = '1';
  });
}

// Modal Video Player
const modal = document.getElementById('videoModal');
const modalPlayer = document.getElementById('modalVideoPlayer');
const modalSource = document.getElementById('modalVideoSource');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalExternalLink = document.getElementById('modalExternalLink');

function openModal(videoSrc, title, meta, externalUrl) {
  if (!modal || !modalPlayer) return;

  modalTitle.textContent = title;
  modalMeta.textContent = meta;
  modalExternalLink.href = externalUrl;

  modalSource.src = videoSrc;
  modalPlayer.load();
  modal.classList.remove('hidden');
  
  modalPlayer.play().catch(e => {
    console.log('Autoplay blocked or stream pending:', e);
  });
}

function closeModal() {
  if (!modal || !modalPlayer) return;
  modalPlayer.pause();
  modalSource.src = '';
  modal.classList.add('hidden');
}

function handleBackdropClick(event) {
  if (event.target === modal) {
    closeModal();
  }
}

function openInstagramModal(reelUrl, title, meta) {
  if (reelUrl) {
    window.open(reelUrl, '_blank', 'noopener,noreferrer');
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
