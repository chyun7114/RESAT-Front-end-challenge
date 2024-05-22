const inputButton = document.getElementById('todo-button');
const allShowButton = document.getElementById('all');
const activeButton = document.getElementById('active');
const noActiveButton = document.getElementById('no-active');

let inputTextTodo = document.getElementById('todo-input');
let todoList = document.getElementById('todo-list');

let todo = {};
let todoCount = 0;
let activeFilter = '';

// 체크박스와 삭제 버튼 설정 함수
function createCheckboxAndDeleteButton(newValue, id) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo[id].isActive;
    checkbox.addEventListener('change', (e) => {
        todo[id].isActive = e.target.checked;
        updateTodoStyle(newValue, e.target.checked);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', () => {
        delete todo[id];
        todoList.removeChild(newValue);
        console.log('Deleted: ' + id);
    });

    newValue.appendChild(checkbox);
    newValue.appendChild(document.createTextNode(todo[id].todo));
    newValue.appendChild(deleteButton);
}

// 할일 스타일 업데이트 함수
function updateTodoStyle(newValue, isActive) {
    if (isActive) {
        newValue.style.textDecoration = 'line-through';
    } else {
        newValue.style.textDecoration = 'none';
    }
}

// 새로운 할일 항목 생성 함수
function createTodoItem(todoText, id) {
    const newValue = document.createElement('li');
    newValue.dataset.id = id;
    createCheckboxAndDeleteButton(newValue, id);
    updateTodoStyle(newValue, todo[id].isActive);
    return newValue;
}

inputButton.addEventListener('click', () => {
    const inputValue = inputTextTodo.value;

    if (inputValue.trim() !== '') { 
        todoCount++;
        todo[todoCount] = {
            id: todoCount,
            todo: inputValue,
            isActive: false
        };

        const newTodoItem = createTodoItem(inputValue, todoCount);
        todoList.appendChild(newTodoItem);

        console.log(todo);

        inputTextTodo.value = '';
    }
});

activeButton.addEventListener('click', () => {
    todoList.innerHTML = '';
    for (let key in todo) {
        if (todo[key].isActive) {
            const newTodoItem = createTodoItem(todo[key].todo, key);
            todoList.appendChild(newTodoItem);
        }
    }
    toggleFilter('active');
});

noActiveButton.addEventListener('click', () => {
    todoList.innerHTML = '';
    for (let key in todo) {
        if (!todo[key].isActive) {
            const newTodoItem = createTodoItem(todo[key].todo, key);
            todoList.appendChild(newTodoItem);
        }
    }
    toggleFilter('no-active');
});

allShowButton.addEventListener('click', () => {
    todoList.innerHTML = '';
    for (let key in todo) {
        if (todo.hasOwnProperty(key)) {
            const newTodoItem = createTodoItem(todo[key].todo, key);
            todoList.appendChild(newTodoItem);
        }
    }
    toggleFilter('all');
});

function toggleFilter(filter) {
    if (activeFilter === filter) {
        activeFilter = '';
        allShowButton.style.border = "none";
        noActiveButton.style.border = "none";
        activeButton.style.border = "none";
        inputButton.disabled = false;
    } else {
        activeFilter = filter;
        if (filter === 'active') {
            activeButton.style.border = "2px solid lightcoral";
            noActiveButton.style.border = "none";
            allShowButton.style.border = "none";
            inputButton.disabled = true;
        } else if (filter === 'no-active') {
            noActiveButton.style.border = "2px solid lightcoral";
            activeButton.style.border = "none";
            allShowButton.style.border = "none";
            inputButton.disabled = true;
        } else {
            allShowButton.style.border = "2px solid lightcoral";
            noActiveButton.style.border = "none";
            activeButton.style.border = "none";
            inputButton.disabled = true;
        }
    }
}
