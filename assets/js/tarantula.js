(function () {
  const modal = document.getElementById('demo-modal');
  const species = document.getElementById('modal-species');
  const success = document.getElementById('modal-success');
  let selectedSpecies = '';

  function track(name, parameters = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, parameters);
    }
    if (typeof window.clarity === 'function') {
      window.clarity('event', name);
    }
    console.info('[Demo analytics]', name, parameters);
  }

  function show(label, isProduct = true) {
    selectedSpecies = label;
    species.textContent = label;
    success.textContent = '';
    modal.hidden = false;
    if (isProduct) {
      track('view_item', {
        currency: 'UAH',
        items: [{ item_id: label, item_name: label }]
      });
    } else {
      track('contact_open', { contact_type: 'general_catalogue_request' });
    }
  }

  document.querySelectorAll('.shop-btn').forEach(button => {
    button.addEventListener('click', () => show(button.dataset.species));
  });
  document.getElementById('contact-btn').addEventListener('click', () => {
    show('Загальний запит про каталог', false);
  });
  document.querySelector('.modal-close').addEventListener('click', () => modal.hidden = true);
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.hidden = true;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') modal.hidden = true;
  });
  document.getElementById('simulate-lead').addEventListener('click', () => {
    success.textContent = 'Готово! Демонстраційний запит зафіксовано локально.';
    track('generate_lead', {
      lead_type: 'educational_simulation',
      item_name: selectedSpecies
    });
  });
  document.querySelectorAll('[data-event]').forEach(element => {
    element.addEventListener('click', () => track(element.dataset.event));
  });
})();
