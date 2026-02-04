// CRITICAL: This key MUST match in order.html
const DB_KEY = 'karenderia_master_menu';

const defaultItems = [
    { id: 1, name: "Classic Burger", price: 250.00 },
    { id: 2, name: "Cheese Pizza", price: 450.00 },
    { id: 3, name: "Garden Salad", price: 180.00 },
    { id: 4, name: "Pasta Carbonara", price: 320.00 }
];

let currentMenu = JSON.parse(localStorage.getItem(DB_KEY));
if (!currentMenu || currentMenu.length === 0) {
    currentMenu = defaultItems;
    localStorage.setItem(DB_KEY, JSON.stringify(currentMenu));
}

function renderMenu() {
    const container = document.getElementById('menu-list-container');
    container.innerHTML = currentMenu.map(item => `
        <div class="flex justify-between items-center">
            <span class="text-sm font-medium">${item.name}</span>
            <div class="flex items-center gap-6">
                <span class="text-sm font-semibold text-pink-400">₱${Number(item.price).toFixed(2)}</span>
                <button onclick="removeItem(${item.id})" class="text-gray-200 hover:text-red-400 transition-colors">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
            </div>
        </div>
    `).join('');
    localStorage.setItem(DB_KEY, JSON.stringify(currentMenu));
}

document.getElementById('menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
    currentMenu.push({ id: Date.now(), name: document.getElementById('item-name').value, price: document.getElementById('item-price').value });
    renderMenu(); e.target.reset();
});

window.removeItem = (id) => { currentMenu = currentMenu.filter(i => i.id !== id); renderMenu(); };
renderMenu();
