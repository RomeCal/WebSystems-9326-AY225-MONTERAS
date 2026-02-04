// --- EVENT DATA ---
const eventsData = [
    { id: 1, title: "Web Mastery 2024", cat: "tech", date: "Oct 15, 2026", desc: "A deep dive into modern CSS and JavaScript frameworks." },
    { id: 2, title: "Code Wars: Algorithm Challenge", cat: "comp", date: "Oct 22, 2026", desc: "Test your logic in this fast-paced coding competition." },
    { id: 3, title: "AI & Future Trends", cat: "tech", date: "Nov 05, 2026", desc: "Understanding how Generative AI is changing the IT landscape." },
    { id: 4, title: "Hackathon Finals", cat: "comp", date: "Dec 10, 2026", desc: "The final showdown of the top dev teams in the university." }
];

// --- RENDER EVENTS ---
function renderEvents(category = 'all') {
    const eventContainer = document.getElementById('event-list');
    if (!eventContainer) return; // Exit if not on events page

    eventContainer.innerHTML = '';

    const filtered = category === 'all' 
        ? eventsData 
        : eventsData.filter(ev => ev.cat === category);

    filtered.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${ev.title}</h3>
            <p>${ev.date}</p>
            <button class="btn" style="margin-top:10px" onclick="openModal(${ev.id})">Details</button>
        `;
        eventContainer.appendChild(card);
    });
}

// --- FILTER LOGIC ---
function filterEvents(category) {
    renderEvents(category);
}

// --- MODAL LOGIC ---
function openModal(id) {
    const event = eventsData.find(e => e.id === id);
    document.getElementById('modalTitle').innerText = event.title;
    document.getElementById('modalDesc').innerText = event.desc;
    document.getElementById('modalDate').innerText = "Schedule: " + event.date;
    document.getElementById('eventModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
}

// --- FORM VALIDATION & LOCAL STORAGE ---
const regForm = document.getElementById('membershipForm');
if (regForm) {
    const nameInp = document.getElementById('regName');
    const emailInp = document.getElementById('regEmail');

    // Load progress from LocalStorage
    nameInp.value = localStorage.getItem('jpcs_name') || '';
    emailInp.value = localStorage.getItem('jpcs_email') || '';

    // Auto-save progress
    regForm.addEventListener('input', () => {
        localStorage.setItem('jpcs_name', nameInp.value);
        localStorage.setItem('jpcs_email', emailInp.value);
    });

    // Form Submission
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name Check
        if (nameInp.value.length < 5) {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('nameError').style.display = 'none';
        }

        // Email Check
        if (!emailInp.value.includes('@')) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('emailError').style.display = 'none';
        }

        if (isValid) {
            alert("Success! Welcome to JPCS, " + nameInp.value);
            localStorage.removeItem('jpcs_name');
            localStorage.removeItem('jpcs_email');
            regForm.reset();
        }
    });
}

// Initialize
window.onload = () => {
    renderEvents();
};