document.getElementById('year').textContent = new Date().getFullYear();

const faqTriggers = document.querySelectorAll('.faq-trigger');
faqTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    const willOpen = trigger.getAttribute('aria-expanded') !== 'true';

    faqTriggers.forEach((otherTrigger) => {
      if (otherTrigger === trigger) return;
      otherTrigger.setAttribute('aria-expanded', 'false');
      document.getElementById(otherTrigger.getAttribute('aria-controls'))?.classList.remove('is-open');
    });

    trigger.setAttribute('aria-expanded', String(willOpen));
    panel.classList.toggle('is-open', willOpen);
  });
});

function initTypewriter(el, startDelay) {
  if (!el) return;
  const words = el.dataset.words.split('|');
  const textEl = el.querySelector('.typewriter-text');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    textEl.textContent = words[0];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex += 1;
      textEl.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        window.setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex -= 1;
      textEl.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    window.setTimeout(tick, deleting ? 35 : 65);
  }

  window.setTimeout(tick, startDelay);
}

initTypewriter(document.getElementById('role-typewriter'), 400);

const bookingOpeners = document.querySelectorAll('#book-me-btn, [data-booking-open]');
const bookingModal = document.getElementById('booking-modal');

if (bookingOpeners.length && bookingModal) {
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');
  let lastFocused = null;

  function openBookingModal() {
    lastFocused = document.activeElement;
    bookingModal.classList.add('is-open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstField = bookingModal.querySelector('input, textarea');
    if (firstField) firstField.focus();
  }

  function closeBookingModal() {
    bookingModal.classList.remove('is-open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  bookingOpeners.forEach((button) => button.addEventListener('click', openBookingModal));

  bookingModal.querySelectorAll('[data-close-modal]').forEach((element) => {
    element.addEventListener('click', closeBookingModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && bookingModal.classList.contains('is-open')) closeBookingModal();
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      bookingForm.hidden = true;
      bookingSuccess.hidden = false;
      window.setTimeout(() => {
        closeBookingModal();
        bookingForm.reset();
        bookingForm.hidden = false;
        bookingSuccess.hidden = true;
      }, 1800);
    });
  }
}

const themeToggle = document.getElementById('theme-toggle');
const siteHeader = document.querySelector('.site-header');
const navbarCanFloat = !document.body.classList.contains('archive-page');

const mobileNavigation = siteHeader?.querySelector(':scope > nav');
if (siteHeader && mobileNavigation) {
  if (!mobileNavigation.id) mobileNavigation.id = 'mobile-navigation';

  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.type = 'button';
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  menuToggle.setAttribute('aria-controls', mobileNavigation.id);
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  siteHeader.insertBefore(menuToggle, mobileNavigation.nextSibling);

  const setMenuOpen = (open) => {
    siteHeader.classList.toggle('nav-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileNavigation.querySelectorAll('a, button').forEach((control) => {
    control.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', (event) => {
    if (!siteHeader.contains(event.target)) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteHeader.classList.contains('nav-open')) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) setMenuOpen(false);
  });
}

const activeCanvasCategory = document.querySelector('.canvas-category-bar .is-active');
if (activeCanvasCategory) {
  requestAnimationFrame(() => {
    activeCanvasCategory.scrollIntoView({ block: 'nearest', inline: 'center' });
  });
}

const archiveMenuTriggers = [...document.querySelectorAll('.archive-menu-trigger')];
if (archiveMenuTriggers.length) {
  const closeArchiveMenus = (except = null) => {
    archiveMenuTriggers.forEach((trigger) => {
      if (trigger === except) return;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.closest('.archive-menu-item').classList.remove('is-open');
    });
  };

  archiveMenuTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      closeArchiveMenus(trigger);
      trigger.setAttribute('aria-expanded', String(willOpen));
      trigger.closest('.archive-menu-item').classList.toggle('is-open', willOpen);
    });
  });

  document.querySelectorAll('.archive-menu-panel a').forEach((link) => {
    link.addEventListener('click', () => closeArchiveMenus());
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.archive-menu-item')) closeArchiveMenus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openTrigger = archiveMenuTriggers.find((trigger) => trigger.getAttribute('aria-expanded') === 'true');
      closeArchiveMenus();
      openTrigger?.focus();
    }
  });
}

const canvasSearch = document.getElementById('canvas-search');
const canvasCommand = document.getElementById('canvas-command');
const canvasCommandInput = document.getElementById('canvas-command-input');
if (canvasSearch && canvasCommand && canvasCommandInput) {
  const commandResults = [...canvasCommand.querySelectorAll('[data-command-result]')];
  let selectedIndex = 0;

  const visibleResults = () => commandResults.filter((result) => !result.hidden);
  const selectResult = (index) => {
    const results = visibleResults();
    if (!results.length) return;
    selectedIndex = (index + results.length) % results.length;
    commandResults.forEach((result) => result.classList.remove('is-selected'));
    results[selectedIndex].classList.add('is-selected');
    results[selectedIndex].scrollIntoView({ block: 'nearest' });
  };
  const filterCommands = () => {
    const query = canvasCommandInput.value.trim().toLowerCase();
    commandResults.forEach((result) => {
      result.hidden = Boolean(query) && !result.textContent.toLowerCase().includes(query);
    });
    selectedIndex = 0;
    selectResult(0);
  };
  const openCommand = () => {
    canvasCommand.classList.add('is-open');
    canvasCommand.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    canvasCommandInput.value = '';
    filterCommands();
    window.setTimeout(() => canvasCommandInput.focus(), 0);
  };
  const closeCommand = () => {
    canvasCommand.classList.remove('is-open');
    canvasCommand.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    canvasSearch.blur();
  };

  canvasSearch.addEventListener('focus', openCommand);
  canvasSearch.addEventListener('click', openCommand);
  canvasCommandInput.addEventListener('input', filterCommands);
  canvasCommand.querySelectorAll('[data-command-close]').forEach((control) => control.addEventListener('click', closeCommand));
  commandResults.forEach((result) => result.addEventListener('click', closeCommand));

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (canvasCommand.classList.contains('is-open')) closeCommand();
      else openCommand();
      return;
    }
    if (!canvasCommand.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      closeCommand();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectResult(selectedIndex + 1);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectResult(selectedIndex - 1);
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      visibleResults()[selectedIndex]?.click();
    }
  });
}

const savedTheme = localStorage.getItem('smpj-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', isDark ? 'Use light theme' : 'Use dark theme');
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('smpj-theme', nextTheme);
  applyTheme(nextTheme);
});

function updateNavbar() {
  siteHeader.classList.toggle('is-floating', navbarCanFloat && window.scrollY > 72);
}

updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });

const pixelHeading = document.querySelector('.pixel-heading');

if (pixelHeading) {
  const words = [pixelHeading.dataset.prefix, pixelHeading.dataset.text];
  const characters = [];

  words.forEach((word) => {
    const group = document.createElement('span');
    group.className = 'pixel-group';
    word.split('').forEach((letter) => {
      const character = document.createElement('span');
      character.className = 'pixel-char';
      character.textContent = letter;
      character.setAttribute('aria-hidden', 'true');
      group.appendChild(character);
      characters.push(character);
    });
    pixelHeading.appendChild(group);
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let activeCharacter = 0;
    characters[activeCharacter].classList.add('is-solid');
    window.setInterval(() => {
      characters[activeCharacter].classList.remove('is-solid');
      activeCharacter = (activeCharacter + 1) % characters.length;
      characters[activeCharacter].classList.add('is-solid');
    }, 200);
  }
}

const typewriter = document.querySelector('.landing-copy .typewriter');

if (typewriter) {
  const words = typewriter.dataset.words.split('|');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    typewriter.textContent = words[0];
  } else {
    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeNextCharacter() {
      const word = words[wordIndex];
      if (!deleting) {
        letterIndex += 1;
        typewriter.textContent = word.slice(0, letterIndex);
        if (letterIndex === word.length) {
          deleting = true;
          window.setTimeout(typeNextCharacter, 2000);
          return;
        }
        window.setTimeout(typeNextCharacter, 80);
      } else {
        letterIndex -= 1;
        typewriter.textContent = word.slice(0, letterIndex);
        if (letterIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          window.setTimeout(typeNextCharacter, 220);
          return;
        }
        window.setTimeout(typeNextCharacter, 45);
      }
    }

    typewriter.textContent = '';
    window.setTimeout(typeNextCharacter, 320);
  }
}

const gradientBarsCanvas = document.querySelector('body:not(.work-page-view) .gradient-bars');

if (gradientBarsCanvas) {
  const hero = gradientBarsCanvas.closest('.landing-hero');
  const context = gradientBarsCanvas.getContext('2d');
  const barCount = 15;
  const pointer = { x: .5, y: .5, active: false };
  let canvasWidth = 0;
  let canvasHeight = 0;
  let phase = 0;

  function sizeGradientBars() {
    const bounds = hero.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = bounds.width;
    canvasHeight = bounds.height;
    gradientBarsCanvas.width = Math.round(canvasWidth * pixelRatio);
    gradientBarsCanvas.height = Math.round(canvasHeight * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    pointer.x = (event.clientX - bounds.left) / bounds.width;
    pointer.y = (event.clientY - bounds.top) / bounds.height;
    pointer.active = true;
  });
  hero.addEventListener('pointerleave', () => { pointer.active = false; });
  window.addEventListener('resize', sizeGradientBars);
  sizeGradientBars();

  function drawGradientBars() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    phase += .018;
    const gap = canvasWidth / barCount;
    const focusX = pointer.active ? pointer.x * canvasWidth : canvasWidth * .5;

    for (let index = 0; index < barCount; index += 1) {
      const x = Math.floor(gap * index);
      const nextX = Math.ceil(gap * (index + 1));
      const normalized = index / (barCount - 1);
      const edgeDistance = Math.abs(normalized - .5) * 2;
      const valley = .2 + Math.pow(edgeDistance, 1.42) * .8;
      const wave = Math.sin(phase * 2.2 + index * .52) * .025;
      const cursorDistance = Math.abs((x + gap * .5) - focusX) / canvasWidth;
      const cursorLift = pointer.active ? Math.max(0, 1 - cursorDistance * 5) * .07 : 0;
      const height = canvasHeight * Math.min(1, valley + wave + cursorLift);
      const gradient = context.createLinearGradient(0, canvasHeight, 0, canvasHeight - height);
      gradient.addColorStop(0, 'rgba(22, 72, 255, .98)');
      gradient.addColorStop(.42, 'rgba(22, 72, 255, .78)');
      gradient.addColorStop(.76, 'rgba(22, 72, 255, .34)');
      gradient.addColorStop(1, 'rgba(22, 72, 255, 0)');
      context.fillStyle = gradient;
      context.fillRect(x, canvasHeight - height, nextX - x, height);
    }
    requestAnimationFrame(drawGradientBars);
  }

  requestAnimationFrame(drawGradientBars);
}

const heroAttraction = document.querySelector('.hero-attraction');

if (heroAttraction) {
  const skills = [
    'User research','Wireframes','Prototypes','User flows','Information architecture','Design systems',
    'Interaction design','Usability testing','Accessibility','Responsive design','Figma','FigJam',
    'Journey maps','Personas','A/B testing','Product analytics','UX writing','Developer handoff',
    'Design workshops','Visual design','Components','Design tokens','Auto layout','Product strategy'
  ];
  const colors = ['#ef3340','#00b894','#ff6b00','#6c5ce7','#0984e3','#e84393','#f2a900','#00a8a8','#ff4757','#9b51e0'];
  const itemHeight = window.innerWidth <= 720 ? 30 : 34;
  const floorPadding = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const initialColumns = Math.max(3, Math.floor(heroAttraction.clientWidth / 118));
  let activeBody = null;
  let pointerOffset = { x: 0, y: 0 };
  let lastPointer = { x: 0, y: 0, time: 0 };

  const bodies = skills.map((skill, index) => {
    const element = document.createElement('div');
    element.className = 'attraction-color';
    element.style.background = colors[index % colors.length];
    element.textContent = skill;
    element.setAttribute('aria-label', skill);
    heroAttraction.appendChild(element);
    const itemWidth = element.offsetWidth;
    return {
      element,
      width: itemWidth,
      height: itemHeight,
      x: Math.min((index % initialColumns) * 118 + 12, Math.max(0, heroAttraction.clientWidth - itemWidth)),
      y: reducedMotion ? heroAttraction.clientHeight - itemHeight - floorPadding - Math.floor(index / initialColumns) * 38 : -50 - Math.floor(index / initialColumns) * 45 - Math.random() * 45,
      vx: (Math.random() - .5) * .8,
      vy: .5 + Math.random(),
      angle: (Math.random() - .5) * 10,
      angularVelocity: (Math.random() - .5) * .35
    };
  });

  function localPoint(event) {
    const bounds = heroAttraction.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  }

  bodies.forEach((body) => {
    body.element.addEventListener('pointerdown', (event) => {
      const point = localPoint(event);
      activeBody = body;
      pointerOffset = { x: point.x - body.x, y: point.y - body.y };
      lastPointer = { ...point, time: performance.now() };
      body.angularVelocity = 0;
      body.element.classList.add('is-dragging');
      body.element.setPointerCapture(event.pointerId);
    });
  });

  heroAttraction.addEventListener('pointermove', (event) => {
    if (!activeBody) return;
    const point = localPoint(event);
    const now = performance.now();
    const delta = Math.max(8, now - lastPointer.time);
    activeBody.vx = (point.x - lastPointer.x) / delta * 9;
    activeBody.vy = (point.y - lastPointer.y) / delta * 9;
    activeBody.angularVelocity = activeBody.vx * .12;
    activeBody.x = point.x - pointerOffset.x;
    activeBody.y = point.y - pointerOffset.y;
    lastPointer = { ...point, time: now };
  });

  function releaseBody() {
    if (!activeBody) return;
    if (!reducedMotion) {
      const released = activeBody;
      const centerX = released.x + released.width / 2;
      const centerY = released.y + released.height / 2;
      const throwStrength = Math.min(6, Math.hypot(released.vx, released.vy));
      bodies.forEach((body) => {
        if (body === released) return;
        const dx = body.x + body.width / 2 - centerX;
        const dy = body.y + body.height / 2 - centerY;
        const distance = Math.max(1, Math.hypot(dx, dy));
        if (distance > 240) return;
        const force = (1 - distance / 240) * (1.5 + throwStrength * .55);
        body.vx += dx / distance * force + released.vx * .22;
        body.vy += dy / distance * force + released.vy * .18;
        body.angularVelocity += (Math.random() - .5) * force * .8;
      });
    }
    activeBody.element.classList.remove('is-dragging');
    activeBody = null;
  }

  heroAttraction.addEventListener('pointerup', releaseBody);
  heroAttraction.addEventListener('pointercancel', releaseBody);

  function animateAttraction() {
    const width = heroAttraction.clientWidth;
    const height = heroAttraction.clientHeight;

    bodies.forEach((body) => {
      if (body !== activeBody) {
        body.vy += .16;
        body.vx *= .996;
        body.vy *= .996;
        body.x += body.vx;
        body.y += body.vy;
        body.angle += body.angularVelocity;
        body.angularVelocity *= .994;
        if (body.x < 0) { body.x = 0; body.vx *= -.34; }
        if (body.x + body.width > width) { body.x = width - body.width; body.vx *= -.34; }
        if (body.y < 0 && body.vy < 0) { body.y = 0; body.vy *= -.3; }
        const radians = body.angle * Math.PI / 180;
        const rotatedHeight = Math.abs(Math.sin(radians)) * body.width + Math.abs(Math.cos(radians)) * body.height;
        const visualBottom = body.y + body.height / 2 + rotatedHeight / 2;
        if (visualBottom > height - floorPadding) {
          body.y -= visualBottom - (height - floorPadding);
          body.vy *= -.28;
          body.vx *= .86;
          body.angularVelocity *= .82;
        }
      }
    });

    for (let first = 0; first < bodies.length; first += 1) {
      for (let second = first + 1; second < bodies.length; second += 1) {
        const a = bodies[first]; const b = bodies[second];
        const overlapX = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
        const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
        if (overlapX > 0 && overlapY > 0) {
          if (overlapX < overlapY) {
            const direction = a.x < b.x ? -1 : 1;
            if (a !== activeBody) a.x += direction * overlapX / 2;
            if (b !== activeBody) b.x -= direction * overlapX / 2;
            [a.vx, b.vx] = [b.vx * .45, a.vx * .45];
          } else {
            const direction = a.y < b.y ? -1 : 1;
            if (a !== activeBody) a.y += direction * overlapY / 2;
            if (b !== activeBody) b.y -= direction * overlapY / 2;
            [a.vy, b.vy] = [b.vy * .4, a.vy * .4];
          }
          a.angularVelocity += b.vx * .02;
          b.angularVelocity -= a.vx * .02;
        }
      }
    }

    bodies.forEach((body) => { body.element.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.angle}deg)`; });
    requestAnimationFrame(animateAttraction);
  }

  if (reducedMotion) {
    bodies.forEach((body) => { body.element.style.transform = `translate3d(${body.x}px, ${body.y}px, 0)`; });
  } else {
    requestAnimationFrame(animateAttraction);
  }
}
