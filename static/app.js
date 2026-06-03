const ticketListEl = document.getElementById('ticketList');
const ticketCountEl = document.getElementById('ticketCount');
const openCountEl = document.getElementById('openCount');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const ticketForm = document.getElementById('ticketForm');
const ticketTitleInput = document.getElementById('ticketTitle');
const ticketStatusInput = document.getElementById('ticketStatus');

const initialTickets = window.initialTickets || [
  { id: 1, title: 'Fix login issue', status: 'Open' },
  { id: 2, title: 'Create tests for API', status: 'In progress' },
  { id: 3, title: 'Deploy new release', status: 'Done' }
];

let tickets = [...initialTickets];

function renderTickets() {
  const query = searchInput.value.trim().toLowerCase();
  const filterStatus = statusFilter.value;

  const visibleTickets = tickets.filter((ticket) => {
    const matchesQuery = ticket.title.toLowerCase().includes(query) || String(ticket.id).includes(query);
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesQuery && matchesStatus;
  });

  ticketListEl.innerHTML = visibleTickets
    .map((ticket) => {
      const statusClass = ticket.status.replace(/\s+/g, '-');
      return `
        <article class="ticket-card" data-status="${ticket.status}">
          <div class="ticket-header">
            <span class="ticket-badge">#${ticket.id}</span>
            <span class="ticket-status ${statusClass}">${ticket.status}</span>
          </div>
          <h2>${ticket.title}</h2>
        </article>
      `;
    })
    .join('') || '<p class="empty-state">No tickets match your current search or filter.</p>';

  ticketCountEl.textContent = tickets.length;
  openCountEl.textContent = tickets.filter((ticket) => ticket.status === 'Open').length;
}

function addTicket(event) {
  event.preventDefault();

  const title = ticketTitleInput.value.trim();
  const status = ticketStatusInput.value;
  if (!title) {
    ticketTitleInput.focus();
    return;
  }

  const nextId = tickets.length ? Math.max(...tickets.map((ticket) => ticket.id)) + 1 : 1;
  tickets.push({ id: nextId, title, status });

  ticketForm.reset();
  renderTickets();
}

searchInput.addEventListener('input', renderTickets);
statusFilter.addEventListener('change', renderTickets);
ticketForm.addEventListener('submit', addTicket);

renderTickets();
