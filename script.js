(function () {
  'use strict';
  var VIEWS = ['home', 'about', 'resume', 'projects', 'contact'];
  var NAMES = { home: '', about: 'About', resume: 'Resume', projects: 'Projects', contact: 'Contact' };
  var root = document.documentElement;
  var firstLoad = true;

  function route() {
    var id = location.hash.slice(1);
    if (id === 'main' && !firstLoad) { return; }
    if (VIEWS.indexOf(id) === -1) { id = 'home'; }
    VIEWS.forEach(function (v) { document.getElementById(v).hidden = (v !== id); });
    document.querySelectorAll('.site-nav__link').forEach(function (a) {
      if (a.hash === '#' + id) { a.setAttribute('aria-current', 'page'); }
      else { a.removeAttribute('aria-current'); }
    });
    document.title = (NAMES[id] ? NAMES[id] + ' — ' : '') + 'Christian Dave Cambay';
    window.scrollTo(0, 0);
    if (!firstLoad) { document.querySelector('#' + id + ' h1').focus({ preventScroll: true }); }
    firstLoad = false;
  }

  var toggle = document.getElementById('theme-toggle');
  function isDark() {
    if (root.dataset.theme) { return root.dataset.theme === 'dark'; }
    return !window.matchMedia('(prefers-color-scheme: light)').matches;
  }
  function label() { toggle.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme'); }
  try { var saved = localStorage.getItem('theme'); if (saved) { root.dataset.theme = saved; } } catch (e) {}
  toggle.addEventListener('click', function () {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    label();
  });

  window.addEventListener('hashchange', route);
  label();
  route();
})();
