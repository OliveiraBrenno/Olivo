import { drinks, events, gallery, money } from './data.js';

const photos = import.meta.glob('./assets/photos/*.webp', { eager: true, query: '?url', import: 'default' });
const asset = (name, size = 1440) => photos[`./assets/photos/${name}-${size}.webp`];
const arrow = '<svg aria-hidden="true"><use href="#arrow"/></svg>';
const page = document.body.dataset.page;
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const dialog = document.querySelector('#detail-dialog');
const dialogContent = document.querySelector('#dialog-content');
let lastTrigger;

function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

function show(html, trigger) {
  lastTrigger = trigger || lastTrigger;
  dialogContent.innerHTML = html;
  if (!dialog.open) dialog.showModal();
  document.querySelector('.dialog-close').focus();
}
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => lastTrigger?.isConnected && lastTrigger.focus());
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-drink]');
  if (!trigger) return;
  if (trigger.classList.contains('drink-card') && trigger.dataset.position !== '0') {
    rotateDeck(Number(trigger.dataset.drink) - activeDrink);
    return;
  }
  const drink = drinks[Number(trigger.dataset.drink)];
  show(`<img class="detail-photo" src="${asset(drink.id)}" alt="${drink.name}" width="1122" height="1402"/><h2 id="dialog-title">${drink.name}</h2><p>${drink.description}</p><p>${drink.story}</p><p><strong>${money(drink.price)}</strong></p><div class="dialog-actions"><a class="ticket-button" href="./cardapio.html">Explorar o cardápio ${arrow}</a></div>`, trigger);
});

let activeDrink = 0;
function rotateDeck(direction) {
  activeDrink = (activeDrink + direction + drinks.length) % drinks.length;
  document.querySelectorAll('.drink-card').forEach((card, index) => {
    const position = (index - activeDrink + drinks.length) % drinks.length;
    card.dataset.position = position;
    card.tabIndex = position === 0 ? 0 : -1;
    card.inert = position > 2;
    card.setAttribute('aria-hidden', String(position > 2));
  });
  document.querySelector('#carousel-status').textContent = `${activeDrink + 1} de ${drinks.length}: ${drinks[activeDrink].name}`;
}
if (page === 'index') {
  document.querySelector('.previous').addEventListener('click', () => rotateDeck(-1));
  document.querySelector('.next').addEventListener('click', () => rotateDeck(1));
  const deck = document.querySelector('.cocktail-deck');
  deck.addEventListener('keydown', event => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    rotateDeck(event.key === 'ArrowRight' ? 1 : -1);
    document.querySelector('.drink-card[data-position="0"]').focus();
  });
  let start = null;
  let swiped = false;
  deck.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0];
    start = { x: touch.clientX, y: touch.clientY };
    swiped = false;
  }, { passive: true });
  deck.addEventListener('touchend', event => {
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      rotateDeck(dx < 0 ? 1 : -1);
      swiped = true;
    }
    start = null;
  }, { passive: true });
  deck.addEventListener('touchcancel', () => { start = null; }, { passive: true });
  deck.addEventListener('click', event => { if (swiped) { event.preventDefault(); event.stopPropagation(); swiped = false; } }, true);
  rotateDeck(0);
}

const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function updateButtons(selector, value, key) {
  document.querySelectorAll(selector).forEach(button => button.setAttribute('aria-pressed', String(button.dataset[key] === value)));
}

if (page === 'cardapio') {
  let category = 'todos';
  const search = document.querySelector('#menu-search');
  const sections = [...document.querySelectorAll('.menu-content [data-category]')];
  const mobile = window.matchMedia('(max-width: 700px)');
  const setDisclosure = () => document.querySelectorAll('.menu-section').forEach(section => { section.open = !mobile.matches; });
  setDisclosure();
  mobile.addEventListener('change', setDisclosure);
  function filterMenu() {
    const query = normalize(search.value.trim());
    let count = 0;
    for (const section of sections) {
      const categoryMatch = category === 'todos' || category === section.dataset.category || (category === 'classicos' && section.dataset.category === 'outros');
      let matches = 0;
      for (const item of section.querySelectorAll('.searchable')) {
        const visible = categoryMatch && normalize(item.dataset.search).includes(query);
        item.hidden = !visible;
        if (visible) matches++;
      }
      section.hidden = !matches;
      if (section.tagName === 'DETAILS' && matches && (query || category !== 'todos')) section.open = true;
      count += matches;
    }
    document.querySelector('.menu-content .empty-state').hidden = count !== 0;
    document.querySelector('.result-count').textContent = `${count} ${count === 1 ? 'item encontrado' : 'itens encontrados'}`;
    updateButtons('[data-filter]', category, 'filter');
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filterMenu(); }));
  search.addEventListener('input', filterMenu);
  document.querySelector('.search').addEventListener('submit', event => { event.preventDefault(); filterMenu(); });
  document.querySelector('.search').addEventListener('reset', () => { search.value = ''; filterMenu(); search.focus(); });
  document.querySelector('[data-clear-menu]').addEventListener('click', () => { category = 'todos'; search.value = ''; setDisclosure(); filterMenu(); search.focus(); });
  filterMenu();
}

if (page === 'programacao') {
  let category = 'todos';
  let date = 'todos';
  const rows = [...document.querySelectorAll('.agenda-row')];
  function matches(id) {
    const event = events.find(item => item.id === id);
    return (date === 'todos' || event.id === date) && (category === 'todos' || event.category === category || event.tags?.includes(category));
  }
  function filterEvents() {
    let count = 0;
    rows.forEach(row => { row.hidden = !matches(row.dataset.event); if (!row.hidden) count++; });
    const features = [...document.querySelectorAll('.feature-event')];
    features.forEach(card => { card.hidden = !matches(card.id.replace('destaque-', '')); });
    document.querySelector('.event-features').hidden = !features.some(card => !card.hidden);
    document.querySelector('.full-agenda .empty-state').hidden = !!count;
    document.querySelector('.event-result').textContent = `${count} ${count === 1 ? 'evento na seleção' : 'eventos na seleção'}`;
    updateButtons('[data-date]', date, 'date');
    updateButtons('[data-filter]', category, 'filter');
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filterEvents(); }));
  document.querySelectorAll('[data-date]').forEach(button => button.addEventListener('click', () => { date = button.dataset.date; filterEvents(); }));
  document.querySelector('[data-clear-events]').addEventListener('click', () => { date = category = 'todos'; filterEvents(); });
}

if (page === 'galeria') {
  let category = 'todos';
  let currentPhoto = 0;
  const tiles = [...document.querySelectorAll('[data-gallery]')];
  const featured = { image: 'negroni', title: 'Noites no Olivo', category: 'coqueteis' };
  function visiblePhotos() { return gallery.map((photo, i) => ({ ...photo, index: i })).filter(photo => category === 'todos' || category === photo.category); }
  function filterGallery() {
    tiles.forEach(tile => { tile.hidden = category !== 'todos' && tile.dataset.category !== category; });
    document.querySelector('.gallery-lead').hidden = category !== 'todos';
    document.querySelector('.gallery-poster').hidden = category !== 'todos';
    updateButtons('[data-filter]', category, 'filter');
    document.querySelector('.gallery-result').textContent = `${tiles.filter(tile => !tile.hidden).length} fotos na seleção`;
  }
  function showPhoto(index, trigger) {
    currentPhoto = index;
    const photo = index === -1 ? featured : gallery[index];
    show(`<img class="detail-photo" src="${asset(photo.image)}" alt="${photo.title}"/><h2 id="dialog-title">${photo.title}</h2><div class="lightbox-nav"><button class="ticket-button" data-photo-previous>Anterior</button><button class="ticket-button" data-photo-next>Próxima ${arrow}</button></div>`, trigger);
  }
  function movePhoto(direction) {
    const list = visiblePhotos();
    const pos = list.findIndex(photo => photo.index === currentPhoto);
    const next = list[(pos + direction + list.length) % list.length];
    if (!next) return;
    const focusSelector = document.activeElement?.matches('[data-photo-previous]') ? '[data-photo-previous]' : '[data-photo-next]';
    showPhoto(next.index);
    dialog.querySelector(focusSelector).focus();
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filterGallery(); }));
  tiles.forEach(tile => tile.addEventListener('click', () => showPhoto(Number(tile.dataset.gallery), tile)));
  document.querySelectorAll('[data-gallery-feature]').forEach(button => button.addEventListener('click', () => showPhoto(-1, button)));
  document.querySelector('[data-show-backstage]').addEventListener('click', () => { category = 'bastidores'; filterGallery(); document.querySelector('.photo-grid').scrollIntoView({ block: 'center' }); });
  dialog.addEventListener('click', event => {
    if (event.target.closest('[data-photo-next]')) movePhoto(1);
    if (event.target.closest('[data-photo-previous]')) movePhoto(-1);
  });
  dialog.addEventListener('keydown', event => {
    if (!['ArrowRight','ArrowLeft'].includes(event.key)) return;
    event.preventDefault(); movePhoto(event.key === 'ArrowRight' ? 1 : -1);
  });
}

const localDate = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
if (page === 'contato') {
  const form = document.querySelector('.contact-form');
  const dateInput = form.elements.date;
  dateInput.min = localDate(new Date());
  const selectedEvent = new URLSearchParams(location.search).get('evento');
  if (selectedEvent) form.elements.message.value = `Olá! Gostaria de saber mais sobre ${selectedEvent.slice(0,200)}.`;
  let preparedMessage = '';
  let visit = null;
  form.addEventListener('input', () => { document.querySelector('.message-preview').hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const result = form.querySelector('.form-result');
    const data = new FormData(form);
    const name = data.get('name').trim();
    const phone = data.get('phone').trim();
    if (!name || phone.replace(/\D/g, '').length < 8) {
      result.textContent = 'Informe seu nome e um telefone com DDD para preparar a mensagem.';
      (!name ? form.elements.name : form.elements.phone).focus(); return;
    }
    const date = data.get('date');
    const time = data.get('time');
    if (date && (!time || !data.get('people'))) {
      result.textContent = 'Para planejar uma reserva, escolha também o horário e o número de pessoas.'; return;
    }
    const start = date && time ? new Date(`${date}T${time}`) : null;
    if (start && (Number.isNaN(start.getTime()) || start <= new Date())) {
      result.textContent = 'Escolha uma data e um horário futuros para a visita.'; dateInput.focus(); return;
    }
    preparedMessage = [`Olá, Olivo! Meu nome é ${name}.`, `Telefone: ${phone}`, `E-mail: ${data.get('email').trim()}`, date ? `Visita: ${new Date(`${date}T12:00`).toLocaleDateString('pt-BR')} às ${time}, para ${data.get('people')} pessoa(s).` : '', data.get('message').trim()].filter(Boolean).join('\n');
    visit = start ? { start, people: data.get('people') } : null;
    document.querySelector('.prepared-message').textContent = preparedMessage;
    const whatsapp = document.querySelector('.whatsapp-link');
    whatsapp.href = `https://wa.me/?text=${encodeURIComponent(preparedMessage)}`;
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    document.querySelector('[data-calendar]').hidden = !visit;
    document.querySelector('.message-preview').hidden = false;
    document.querySelector('.copy-result').textContent = '';
    result.textContent = 'Mensagem preparada. Abra o WhatsApp e escolha o contato confirmado do Olivo para enviar.';
  });
  document.querySelector('[data-copy-message]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preparedMessage);
      document.querySelector('.copy-result').textContent = 'Mensagem copiada.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('.prepared-message'));
      selection.removeAllRanges(); selection.addRange(range);
      document.querySelector('.copy-result').textContent = 'Selecionei o texto. Use a opção Copiar do seu dispositivo.';
    }
  });
  document.querySelector('[data-calendar]').addEventListener('click', () => {
    if (!visit) return;
    const stamp = date => date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
    const calendar = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Olivo//Visita//PT-BR','BEGIN:VEVENT',`UID:${crypto.randomUUID()}@olivo.local`,`DTSTAMP:${stamp(new Date())}`,`DTSTART:${stamp(visit.start)}`,`DTEND:${stamp(new Date(visit.start.getTime()+7200000))}`,'SUMMARY:Visita ao Olivo',`DESCRIPTION:Visita planejada para ${visit.people} pessoa(s). O lembrete não confirma uma reserva.`,'LOCATION:Lapa\\, Rio de Janeiro','END:VEVENT','END:VCALENDAR'].join('\r\n');
    const url = URL.createObjectURL(new Blob([calendar], { type:'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'visita-olivo.ics'; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    document.querySelector('.copy-result').textContent = 'Lembrete preparado para adicionar ao calendário. A reserva ainda precisa ser confirmada.';
  });
}
