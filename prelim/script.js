/**
 * JPCS ADVANCED WEB SYSTEM ENGINE
 */

// --- 1. DATA STATE ---
const STATE = {
    events: [
        { id: 1, title: "Web Mastery 2024", cat: "tech", date: "2024-11-20", desc: "Master the latest in frontend frameworks and CSS architecture." },
        { id: 2, title: "Code Wars Hackathon", cat: "comp", date: "2024-12-05", desc: "24-hour coding challenge to solve community issues." },
        { id: 3, title: "Cloud Fundamentals", cat: "tech", date: "2024-10-15", desc: "Introduction to AWS and Azure infrastructure." },
        { id: 4, title: "Member Mixer Night", cat: "social", date: "2024-09-30", desc: "Networking and games for new members." }
    ],
    officers: [
        { name: "Juan Dela Cruz", role: "President", specialty: "Fullstack Dev" },
        { name: "Maria Santos", role: "VP Internal", specialty: "UI/UX Design" },
        { name: "Dev Lee", role: "Tech Lead", specialty: "Cybersecurity" }
    ],
    filters: {
        search: '',
        category: 'all',
        time: 'all'
    }
};

// --- 2. UTILITIES (Toasts & Modals) ---
const showToast = (msg) => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

const openModal = (title, desc) => {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('eventModal').style.display = 'flex';
};

const closeModal = () => {
    document.getElementById('eventModal').style.display = 'none';
};

// --- 3. RENDERING ENGINE ---
const renderEvents = () => {
    const list = document.getElementById('event-list');
    if (!list) return;

    const today = new Date();
    
    const filtered = STATE.events.filter(ev => {
        const matchesSearch = ev.title.toLowerCase().includes(STATE.filters.search.toLowerCase());
        const matchesCat = STATE.filters.category === 'all' || ev.cat === STATE.filters.category;
        const matchesTime = STATE.filters.time === 'all' || new Date(ev.date) >= today;
        return matchesSearch && matchesCat && matchesTime;
    });

    list.innerHTML = filtered.map(ev => `
        <div class="card">
            <span style="color: var(--primary); font-size: 0.8rem; font-weight: bold;">${ev.cat.toUpperCase()}</span>
            <h3 style="margin: 10px 0;">${ev.title}</h3>
            <p style="opacity: 0.7; font-size: 0.9rem; margin-bottom: 15px;">Date: ${ev.date}</p>
            <button class="btn" onclick="openModal('${ev.title}', '${ev.desc}')">View Details</button>
        </div>
    `).join('');
};

const renderOfficers = () => {
    const grid = document.getElementById('officer-grid');
    if (!grid) return;

    grid.innerHTML = STATE.officers.map(o => `
        <div class="card" style="text-align: center;" onclick="showToast('Expertise: ${o.specialty}')">
            <div style="width: 100px; height: 100px; background: var(--primary); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 1.5rem;">${o.name.charAt(0)}</div>
            <h3>${o.name}</h3>
            <p style="color: var(--primary); font-weight: bold;">${o.role}</p>
            <p style="font-size: 0.8rem; margin-top: 10px; opacity: 0.6;">Click for specialty</p>
        </div>
    `).join('');
};

// --- 4. FILTERS & SEARCH ---
const updateFilters = () => {
    STATE.filters.category = document.getElementById('catFilter').value;
    STATE.filters.time = document.getElementById('dateFilter').value;
    renderEvents();
};

// --- 5. REGISTRATION & LOCALSTORAGE ---
const initRegistration = () => {
    const form = document.getElementById('membershipForm');
    if (!form) return;

    const inputs = ['regName', 'regEmail', 'regID'];

    // Load Draft
    inputs.forEach(id => {
        const saved = localStorage.getItem(id);
        if (saved) document.getElementById(id).value = saved;
    });

    // Auto-save
    form.addEventListener('input', (e) => {
        localStorage.setItem(e.target.id, e.target.value);
    });

    // Submit & Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        
        if (!email.includes('@')) {
            showToast("❌ Invalid Email Format");
            return;
        }

        showToast("🚀 Application Submitted!");
        localStorage.clear();
        form.reset();
    });
};

// --- 6. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    renderOfficers();
    initRegistration();

    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            STATE.filters.search = e.target.value;
            renderEvents();
        });
    }
});
