const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', handleListClick);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

let savedTheme = localStorage.getItem('savedTheme') || 'standard';
changeTheme(savedTheme);

function addToDo(event) {
    event.preventDefault();
    
    if (toDoInput.value.trim() === '') {
        toDoInput.placeholder = "Please enter a task!";
        toDoInput.classList.add('error');
        setTimeout(() => toDoInput.classList.remove('error'), 2000);
        return;
    }

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    saveLocal(toDoInput.value);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);
    toDoInput.value = '';
}

function handleListClick(event) {
    const item = event.target;
    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => todo.remove());
    } else if (item.classList.contains('check-btn')) {
        item.parentElement.classList.toggle("completed");
    }
}

function saveLocal(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const toDoDiv = document.createElement("div");
        const currentTheme = localStorage.getItem('savedTheme') || 'standard';
        toDoDiv.classList.add("todo", `${currentTheme}-todo`);

        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${currentTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${currentTheme}-button`);
        toDoDiv.appendChild(deleted);

        toDoList.appendChild(toDoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(item => item !== todo.children[0].innerText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = color;
    document.body.className = color;

    document.getElementById('title').classList.toggle('darker-title', color === 'darker');
    document.querySelector('input').className = `${color}-input`;

    document.querySelectorAll('.todo').forEach(todo => {
        todo.classList.toggle('completed', todo.classList.contains('completed'));
        todo.className = `todo ${color}-todo`;
    });

    document.querySelectorAll('.check-btn, .delete-btn, .todo-btn').forEach(button => {
        button.className = `${button.classList[0]} ${color}-button`;
    });
}
