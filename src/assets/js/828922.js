(function() {
  const init = () => {
    const wrappers = document.querySelectorAll('.systems-dropdown-wrapper');

    wrappers.forEach(wrapper => {
      const btn = wrapper.querySelector('.systems-dropdown-btn');
      const menu = wrapper.querySelector('.systems-dropdown-menu');
      const chevron = wrapper.querySelector('.systems-chevron');

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !menu.classList.contains('hidden');
        if (isOpen) {
          menu.classList.add('hidden');
          chevron.classList.remove('rotate-180');
        } else {
          menu.classList.remove('hidden');
          chevron.classList.add('rotate-180');
        }
      });

      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
          menu.classList.add('hidden');
          chevron.classList.remove('rotate-180');
        }
      });
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();