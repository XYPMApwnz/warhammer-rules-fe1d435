(() => {
  const toggle = document.querySelector('[data-mode-toggle]');
  if (toggle) { toggle.textContent = 'Production baseline'; toggle.disabled = true; }
})();
