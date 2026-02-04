const DB_KEY = 'karenderia_master_menu';
        let trayTotal = 0, trayCount = 0;

        function loadMenu() {
            const grid = document.getElementById('dynamic-menu-grid');
            const menu = JSON.parse(localStorage.getItem(DB_KEY)) || [];
            grid.innerHTML = menu.map(item => `
                <div onclick="addItem(${item.price})" class="flex flex-col gap-3 group cursor-pointer">
                    <div class="w-full aspect-square rounded-2xl bg-white border-2 border-transparent group-hover:border-[#ef3994] transition-all flex items-center justify-center text-3xl shadow-sm">🍲</div>
                    <div><p class="font-bold">${item.name}</p><p class="text-[#9a4c73] text-sm font-semibold">₱${parseFloat(item.price).toFixed(2)}</p></div>
                </div>
            `).join('');
        }

        function addItem(price) { trayTotal += parseFloat(price); trayCount++; updateUI(); }
        function updateUI() { document.getElementById('running-total').innerText = `₱${trayTotal.toFixed(2)}`; document.getElementById('item-count').innerText = trayCount; }
        
        function completeOrder() {
            if (trayCount === 0) return alert("Select an item!");
            localStorage.setItem('karenderia_sales_total', (parseFloat(localStorage.getItem('karenderia_sales_total')) || 0) + trayTotal);
            localStorage.setItem('karenderia_order_count', (parseInt(localStorage.getItem('karenderia_order_count')) || 0) + 1);
            alert("Order Complete!"); clearDraft();
        }
 //dsadsadsasdsds
        function clearDraft() { trayTotal = 0; trayCount = 0; updateUI(); }
        window.onload = loadMenu;