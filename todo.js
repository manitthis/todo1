const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
let todos = [];

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo);
        renderTodos(todos);
        todoInput.value = '';
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${item.completed ? 'checked' : ''}>
            ${item.name}
            <button class="delete-button">X</button>
        `;
        todoItemsList.append(li);
    });
}

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

function toggle(id) {
    todos.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    renderTodos(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });
    renderTodos(todos);
}