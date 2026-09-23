const button = document.querySelector('.menu-button');
const menu = document.querySelector('.mobile-menu');

function closeMenu() {
  button.setAttribute('aria-expanded', 'false');
  menu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

button.addEventListener('click', () => {
  const willOpen = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(willOpen));
  menu.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = new FormData(contactForm);
    const name = String(fields.get('name') || '').trim();
    const organization = String(fields.get('organization') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const topic = String(fields.get('topic') || 'General question');
    const message = String(fields.get('message') || '').trim();
    if (!name || !message) {
      const missing = !name ? contactForm.elements.namedItem('name') : contactForm.elements.namedItem('message');
      missing.focus();
      return;
    }
    const subject = `RobotECS — ${topic}`;
    const body = [
      `Name: ${name}`,
      ...(organization ? [`Organization: ${organization}`] : []),
      `Email: ${email}`,
      `Topic: ${topic}`,
      '',
      message,
    ].join('\n');
    const draft = `mailto:kajin30@ecsloudoun.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector('#contact-status');
    status.hidden = false;
    status.textContent = 'Email draft ready. If your email app did not open, email kajin30@ecsloudoun.org directly.';
    window.location.href = draft;
  });
}

const hero = document.querySelector('.home-hero');
const dotsCanvas = document.querySelector('.hero-dots');
if (hero && dotsCanvas) {
  const context = dotsCanvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interactive = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion;
  const pointer = { x: -1000, y: -1000 };
  const heroContent = hero.querySelector('.hero-content');
  let width = 0;
  let height = 0;
  let frame = 0;
  let scrollProgress = 0;
  let targetProgress = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const smoothstep = (value) => value * value * (3 - 2 * value);

  function drawDots() {
    context.clearRect(0, 0, width, height);
    const scatter = reducedMotion ? 0 : smoothstep(clamp(scrollProgress / 0.84, 0, 1));
    context.fillStyle = `rgba(244, 243, 237, ${0.18 * (1 - scatter)})`;
    const spacing = 22;
    const radius = 130;
    for (let y = 11; y < height; y += spacing) {
      for (let x = 11; x < width; x += spacing) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const shift = interactive && distance < radius ? Math.pow(1 - distance / radius, 2) * 16 : 0;
        const offsetX = distance ? (dx / distance) * shift : 0;
        const offsetY = distance ? (dy / distance) * shift : 0;
        context.beginPath();
        const angle = (x * 0.173 + y * 0.097) % (Math.PI * 2);
        const driftX = Math.cos(angle) * scatter * 30;
        const driftY = Math.sin(angle) * scatter * 30;
        context.arc(x + offsetX + driftX, y + offsetY + driftY, 1.1, 0, Math.PI * 2);
        context.fill();
      }
    }
  }

  function render() {
    frame = 0;
    scrollProgress += (targetProgress - scrollProgress) * 0.16;
    if (Math.abs(targetProgress - scrollProgress) < 0.001) scrollProgress = targetProgress;

    if (!reducedMotion) {
      const textFade = smoothstep(clamp((scrollProgress - 0.48) / 0.46, 0, 1));
      heroContent.style.opacity = String(1 - textFade);
      heroContent.style.transform = `translateY(${-22 * textFade}px)`;
      heroContent.style.filter = `blur(${5 * textFade}px)`;
    }

    drawDots();
    if (scrollProgress !== targetProgress) scheduleRender();
  }

  function scheduleRender() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  function resizeDots() {
    const bounds = hero.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    dotsCanvas.width = Math.round(width * scale);
    dotsCanvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    scheduleRender();
  }

  new ResizeObserver(resizeDots).observe(hero);
  if (!reducedMotion) {
    const updateScroll = () => {
      const bounds = hero.getBoundingClientRect();
      targetProgress = clamp(-bounds.top / Math.max(bounds.height, 1), 0, 1);
      scheduleRender();
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
  }
  if (interactive) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      scheduleRender();
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      pointer.x = -1000;
      pointer.y = -1000;
      scheduleRender();
    });
  }
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveals = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
    reveals.forEach((element) => observer.observe(element));
  }
}

// Snap short gestures between the full-screen sections without skipping tall mobile content.
if (window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  const packagePage = document.querySelector('.package-page');
  if (packagePage) {
    gsap.fromTo(packagePage.querySelectorAll('.package-page-intro > *'),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: packagePage,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    packagePage.querySelectorAll('.package-levels tbody tr').forEach((row) => {
      gsap.fromTo(row,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
    });
  }
  const packagesSection = document.querySelector('.packages-section');
  if (packagesSection) {
    gsap.timeline({
      scrollTrigger: {
        trigger: packagesSection,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 0.7,
      },
    })
      .fromTo(packagesSection.querySelectorAll('.packages-heading > *'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, ease: 'power2.out' })
      .fromTo(packagesSection.querySelectorAll('.skills-list li'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' }, 0.2);
  }
  const closingSection = document.querySelector('.closing-section');
  if (closingSection) {
    gsap.fromTo(closingSection.querySelectorAll('h2 span'),
      { yPercent: 65, opacity: 0, rotate: -3 },
      {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: closingSection,
          start: 'top 95%',
          end: 'top 55%',
          scrub: 0.8,
        },
      });
  }
  const sponsorSection = document.querySelector('.sponsor-banner');
  const goalsSection = document.querySelector('.goals-section');
  if (sponsorSection && goalsSection && packagesSection) {
    ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      snap: {
        snapTo: (progress, trigger) => {
          const max = ScrollTrigger.maxScroll(window);
          if (!max || document.body.classList.contains('menu-open')) return progress;
          const sponsorTop = sponsorSection.getBoundingClientRect().top + window.scrollY;
          const goalsTop = goalsSection.getBoundingClientRect().top + window.scrollY;
          const packagesTop = packagesSection.getBoundingClientRect().top + window.scrollY;
          const currentY = progress * max;
          // A completed snap must stay put instead of starting another section transition.
          if (Math.abs(currentY - sponsorTop) < 3) return Math.min(sponsorTop / max, 1);
          if (Math.abs(currentY - goalsTop) < 3) return Math.min(goalsTop / max, 1);
          if (Math.abs(currentY - packagesTop) < 3) return Math.min(packagesTop / max, 1);
          if (currentY > packagesTop + 3) return progress;
          if (currentY > goalsTop + 3) {
            const goalsFits = goalsSection.offsetHeight <= window.innerHeight * 1.35;
            const nearPackages = currentY >= packagesTop - Math.min(window.innerHeight * 0.55, 350);
            if (trigger.direction > 0 && currentY < packagesTop && (goalsFits || nearPackages)) {
              return Math.min(packagesTop / max, 1);
            }
            return progress;
          }
          if (trigger.direction > 0) {
            return Math.min((currentY < sponsorTop - 8 ? sponsorTop : goalsTop) / max, 1);
          }
          return Math.max((currentY > goalsTop + 8 ? goalsTop : 0) / max, 0);
        },
        delay: 0.08,
        duration: { min: 0.48, max: 0.72 },
        ease: 'power2.inOut',
        inertia: false,
      },
    });
  }
}
