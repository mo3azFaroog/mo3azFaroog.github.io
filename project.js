/* Shared behaviour for the project case-study pages.
   Each page defines its slides before loading this file:
   <script>window.PROJECT_SLIDES = [{ url: '...', caption: '...' }, ...];</script> */
(function () {
  'use strict';

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- navigation: mobile menu + Projects dropdown ---------- */
  var menuBtn = document.getElementById('mobile-menu-btn');
  var navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(function (link) {
      link.addEventListener('click', function () { navLinks.classList.remove('active'); });
    });
  }
  document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var open = toggle.parentElement.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- slideshow ---------- */
  var slides = window.PROJECT_SLIDES || [];
  var box = document.querySelector('.slideshow-container');
  var img = document.getElementById('slide-image');
  var caption = document.getElementById('slide-caption');
  var dotsBox = document.getElementById('slide-dots');
  var prevBtn = document.getElementById('slide-prev');
  var nextBtn = document.getElementById('slide-next');
  if (!slides.length || !box || !img) return;

  var current = 0;
  var timer = null;
  var dots = [];

  slides.forEach(function (slide, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () { stopAuto(); show(i); });
    dotsBox.appendChild(dot);
    dots.push(dot);
  });

  function preload(i) {
    var s = slides[(i + slides.length) % slides.length];
    if (s) { var p = new Image(); p.src = s.url; }
  }

  function show(i) {
    current = (i + slides.length) % slides.length;
    img.src = slides[current].url;
    img.alt = slides[current].caption;
    caption.textContent = slides[current].caption;
    dots.forEach(function (d, idx) {
      d.classList.toggle('active', idx === current);
      d.setAttribute('aria-current', idx === current ? 'true' : 'false');
    });
    preload(current + 1);
  }

  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  prevBtn.addEventListener('click', function () { stopAuto(); show(current - 1); });
  nextBtn.addEventListener('click', function () { stopAuto(); show(current + 1); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { stopAuto(); show(current + 1); }
    if (e.key === 'ArrowLeft') { stopAuto(); show(current - 1); }
  });

  /* swipe */
  var startX = 0;
  box.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });
  box.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].screenX - startX;
    if (Math.abs(dx) > 50) { stopAuto(); show(dx > 0 ? current - 1 : current + 1); }
  }, { passive: true });

  /* the first slide used to appear only after the first autoplay tick; show it immediately */
  show(0);

  /* autoplay every 6s until the visitor interacts (skipped for reduced-motion users) */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && slides.length > 1) {
    timer = setInterval(function () { show(current + 1); }, 6000);
    box.addEventListener('click', stopAuto);
  }
})();
