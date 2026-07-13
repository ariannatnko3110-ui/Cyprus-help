// Номер телефона зафиксирован в международном формате
const TELEGRAM_PHONE = '35794342974';

const i18n = {
    ru: {
        "nav-cats": "Категории", "nav-tasks": "Все заказы", "nav-create": "Создать задание",
        "hero-title": "Сервис заказа услуг на Кипре", "hero-subtitle": "Опишите вашу задачу, опубликуйте её и выбирайте лучших мастеров рядом.",
        "cats-title": "Популярные категории", "tasks-title": "Актуальные заказы на сегодня",
        "cat-cleaning": "Уборка и клининг", "cat-plumbing": "Сантехника", "cat-electric": "Электрика",
        "cat-delivery": "Доставка и логистика", "cat-it": "IT и разработка", "cat-repair": "Ремонт техники",
        "form-title": "Опубликовать новое задание", "form-subtitle": "Это бесплатно и займет не более минуты",
        "label-title": "Что нужно сделать?", "label-cat": "Выберите категорию", "label-budget": "Ваш бюджет (€)",
        "label-desc": "Детальное описание задачи", "btn-submit": "Разместить заказ",
        "status-open": "Статус: Открыт", "btn-respond": "💬 Откликнуться в Telegram",
        "alert-success": "Задание успешно добавлено!", "placeholder-title": "Например: Починить кондиционер",
        "placeholder-desc": "Укажите город, сроки или важные нюансы...", "no-tasks": "Заказов в этой категории пока нет."
    },
    en: {
        "nav-cats": "Categories", "nav-tasks": "All Orders", "nav-create": "Create a Task",
        "hero-title": "Services & Handymen in Cyprus", "hero-subtitle": "Describe your task, publish it and choose the best local handymen.",
        "cats-title": "Popular Categories", "tasks-title": "Active Orders Today",
        "cat-cleaning": "Cleaning Services", "cat-plumbing": "Plumbing", "cat-electric": "Electrical Works",
        "cat-delivery": "Delivery & Logistics", "cat-it": "IT & Development", "cat-repair": "Appliance Repair",
        "form-title": "Publish a New Task", "form-subtitle": "It's free and takes less than a minute",
        "label-title": "What needs to be done?", "label-cat": "Select Category", "label-budget": "Your Budget (€)",
        "label-desc": "Detailed Task Description", "btn-submit": "Post an Order",
        "status-open": "Status: Open", "btn-respond": "💬 Contact via Telegram",
        "alert-success": "Task successfully published!", "placeholder-title": "e.g., Fix AC unit",
        "placeholder-desc": "Specify city, deadlines, or details for the master...", "no-tasks": "No active orders in this category yet."
    },
    el: {
        "nav-cats": "Κατηγορίες", "nav-tasks": "Όλες οι Παραγγελίες", "nav-create": "Δημιουργία Εργασίας",
        "hero-title": "Υπηρεσίες & Μάστορες στην Κύπρο", "hero-subtitle": "Περιγράψτε την εργασία σας, δημοσιεύστε την και επιλέξτε τους καλύτερους.",
        "cats-title": "Δημοφιλείς Κατηγορίες", "tasks-title": "Ενεργές Παραγγελίες Σήμερα",
        "cat-cleaning": "Καθαρισμός", "cat-plumbing": "Υδραυλικά", "cat-electric": "Ηλεκτρολογικά",
        "cat-delivery": "Παράδοση & Logistics", "cat-it": "IT & Ανάπτυξη", "cat-repair": "Επισκευή Συσκευών",
        "form-title": "Δημοσιεύστε μια Εργασία", "form-subtitle": "Είναι δωρεάν και παίρνει λιγότερο από ένα λεπτό",
        "label-title": "Τι πρέπει να γίνει;", "label-cat": "Επιλέξτε Κατηγορία", "label-budget": "Προϋπολογισμός (€)",
        "label-desc": "Λεπτομερής Περιγραφή Εργασίας", "btn-submit": "Δημοσίευση",
        "status-open": "Κατάσταση: Ανοιχτή", "btn-respond": "💬 Επικοινωνία μέσω Telegram",
        "alert-success": "Η εργασία δημοσιεύτηκε με επιτυχία!", "placeholder-title": "π.χ., Επισκευή κλιματιστικού",
        "placeholder-desc": "Καθορίστε πόλη, προθεσμίες ή λεπτομέρειες...", "no-tasks": "Δεν υπάρχουν ακόμη παραγγελίες σε αυτήν την κατηγορία."
    }
};

let currentLang = localStorage.getItem('cyprus_lang') || 'ru';

const defaultTasks = [
    { id: 1, title: "Генеральная уборка апартаментов в Лимассоле", category: "Клининг", budget: "90", desc: "Необходимо убрать 1-спальную квартиру после выезда жильцов." },
    { id: 2, title: "Установка и настройка роутера", category: "IT", budget: "40", desc: "Нужно подключить новый роутер от Cyta и настроить Wi-Fi." }
];

let tasks = JSON.parse(localStorage.getItem('cyprus_tasks')) || defaultTasks;

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('cyprus_lang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (i18n[lang][key]) elem.innerText = i18n[lang][key];
    });

    const titleInput = document.getElementById('task-title');
    const descInput = document.getElementById('task-desc');
    if(titleInput) titleInput.placeholder = i18n[lang]['placeholder-title'];
    if(descInput) descInput.placeholder = i18n[lang]['placeholder-desc'];

    renderTasks(tasks);
}

function renderTasks(tasksToRender) {
    const listContainer = document.getElementById('tasks-list');
    if(!listContainer) return;
    listContainer.innerHTML = '';

    if (tasksToRender.length === 0) {
        listContainer.innerHTML = `<p style="padding: 20px; color: #777;">${i18n[currentLang]['no-tasks']}</p>`;
        return;
    }

    tasksToRender.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = `
            <div class="task-top">
                <h3>${task.title}</h3>
                <span class="task-budget">${task.budget} €</span>
            </div>
            <div class="task-info"><strong>${task.category}</strong> | ${i18n[currentLang]['status-open']}</div>
            <p class="task-text">${task.desc}</p>
            <button class="btn-respond" onclick="respondToTask('${encodeURIComponent(task.title)}')">${i18n[currentLang]['btn-respond']}</button>
        `;
        listContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            switchLanguage(this.getAttribute('data-lang'));
        });
        if(btn.getAttribute('data-lang') === currentLang) {
            btn.click();
        }
    });

    const form = document.getElementById('create-task-form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const newTask = {
                id: Date.now(),
                title: document.getElementById('task-title').value,
                category: document.getElementById('task-cat').options[document.getElementById('task-cat').selectedIndex].text,
                budget: document.getElementById('task-budget').value,
                desc: document.getElementById('task-desc').value
            };
            tasks.unshift(newTask);
            localStorage.setItem('cyprus_tasks', JSON.stringify(tasks));
            renderTasks(tasks);
            this.reset();
            alert(i18n[currentLang]['alert-success']);
        });
    }

    document.querySelectorAll('.cat-card').forEach(card => {
        card.addEventListener('click', function() {
            const selectedCat = this.getAttribute('data-category');
            const filtered = tasks.filter(t => t.category.includes(selectedCat) || selectedCat.includes(t.category));
            renderTasks(filtered);
            document.getElementById('tasks-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Прямая гарантированная ссылка открытия чата Telegram
window.respondToTask = function(taskTitle) {
    const decodedTitle = decodeURIComponent(taskTitle);
    const text = `Здравствуйте! Я хочу откликнуться на заказ: "${decodedTitle}"`;
    // Используем универсальный Telegram редирект, который работает на смартфонах и планшетах Apple/Android
    window.open(`https://t.me{encodeURIComponent(text)}&phone=${TELEGRAM_PHONE}`, '_blank');
}
