const defaultTasks = [
    {
        id: 1,
        title: "Починить смеситель в ванной комнате",
        category: "Сантехника",
        budget: "600",
        desc: "Капает вода из-под рычага смесителя. Нужно приехать со своим инструментом, возможно заменить картридж."
    },
    {
        id: 2,
        title: "Генеральная уборка 2-комнатной квартиры",
        category: "Клининг",
        budget: "1800",
        desc: "Необходимо помыть окна, полы, протереть пыль со всех поверхностей и убрать на кухне. Моющие средства предоставлю."
    }
];

let tasks = JSON.parse(localStorage.getItem('marketplace_tasks')) || defaultTasks;

function renderTasks(tasksToRender) {
    const listContainer = document.getElementById('tasks-list');
    if(!listContainer) return;
    listContainer.innerHTML = '';

    if (tasksToRender.length === 0) {
        listContainer.innerHTML = '<p style="padding: 20px; color: #777;">По вашему запросу заказов не найдено.</p>';
        return;
    }

    tasksToRender.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = `
            <div class="task-top">
                <h3>${task.title}</h3>
                <span class="task-budget">${task.budget} грн</span>
            </div>
            <div class="task-info">Категория: <strong>${task.category}</strong> | Статус: Открыт</div>
            <p class="task-text">${task.desc}</p>
            <button class="btn-respond" onclick="respondToTask(${task.id})">Откликнуться на заказ</button>
        `;
        listContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTasks(tasks);

    const form = document.getElementById('create-task-form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const newTask = {
                id: Date.now(),
                title: document.getElementById('task-title').value,
                category: document.getElementById('task-cat').value,
                budget: document.getElementById('task-budget').value,
                desc: document.getElementById('task-desc').value
            };
            tasks.unshift(newTask);
            localStorage.setItem('marketplace_tasks', JSON.stringify(tasks));
            renderTasks(tasks);
            this.reset();
            alert('Задание успешно опубликовано на бирже!');
        });
    }

    const searchBtn = document.getElementById('search-btn');
    if(searchBtn) {
        searchBtn.addEventListener('click', runSearch);
    }
    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') runSearch();
        });
    }

    function runSearch() {
        const query = document.getElementById('search-input').value.toLowerCase().trim();
        const filtered = tasks.filter(t => t.title.toLowerCase().includes(query) || t.desc.toLowerCase().includes(query));
        renderTasks(filtered);
    }

    document.querySelectorAll('.cat-card').forEach(card => {
        card.addEventListener('click', function() {
            const selectedCat = this.getAttribute('data-category');
            const filtered = tasks.filter(t => t.category === selectedCat);
            renderTasks(filtered);
            document.getElementById('tasks-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

window.respondToTask = function(id) {
    alert('Вы успешно отправили заявку на выполнение! Контакты заказчика станут доступны после подтверждения.');
}
