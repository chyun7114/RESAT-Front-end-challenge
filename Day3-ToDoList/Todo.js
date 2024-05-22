// <li><input type="checkbox" /> 할일 목록</li>

// 버튼들
const inputButton = document.getElementById('todo-button');
const allShowButton = document.getElementById('all');
const activeButton = document.getElementById('active');
const noActiveButton = document.getElementById('no-active');

let inputTextTodo = document.getElementById('todo-input');
let todoList = document.getElementById('todo-list');

let todo = {};
let todoCount = 0;
let activeFilter = '';

inputButton.addEventListener('click', () =>{
    // 인풋 값을 가져온다
    const inputValue = inputTextTodo.value;

    // 값이 비어있는 경우 실행하지 않는다
    if(inputValue.trim() !== '') { 
        const newValue = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', (e) => {
            todo[newValue.dataset.id].isActive = e.target.checked;
            if(e.target.checked)
                console.log(newValue.dataset.id + " is checked");
            else
                console.log(newValue.dataset.id + " is unchecked");
        });

        newValue.appendChild(checkbox);
        newValue.appendChild(document.createTextNode(inputValue));
        
        // todo 데이터셋 만들기
        newValue.dataset.id = todoCount + 1;
        todoList.appendChild(newValue);
        todoCount++;
        todo[todoCount] = {
            id : todoCount,
            todo : inputValue,
            isActive : false
        };
        
        console.log(todo);

        inputTextTodo.value = '';
    }
});

activeButton.addEventListener('click', () => {
    // 모든 li 요소를 지운다
    todoList.innerHTML = '';

    // 체크된 항목들만 필터링하여 표시
    for (let key in todo) {
        if (todo[key].isActive) {
            const newValue = document.createElement('li');
            newValue.innerHTML = '<input type="checkbox" checked disabled />' + todo[key].todo;
            todoList.appendChild(newValue);
        }
    }

    toggleFilter('active');
});

noActiveButton.addEventListener('click', () => {
    todoList.innerHTML = '';

    // 체크되지 않은 항목들만 필터링하여 표시
    for (let key in todo) {
        if (!todo[key].isActive) {
            const newValue = document.createElement('li');
            newValue.innerHTML = '<input type="checkbox" disabled />' + todo[key].todo;
            todoList.appendChild(newValue);
        }
    }

    toggleFilter('no-active');
});

allShowButton.addEventListener('click', () =>{
    todoList.innerHTML = '';
    // 처음 상태로 필터링하여 표시한다
    for (let key in todo) {
        if (todo.hasOwnProperty(key)) { // 해당 키가 존재하는지 확인
            const newValue = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo[key].isActive || false; // isActive가 null일 경우 false로 설정
            checkbox.addEventListener('change', (e) => {
                todo[key].isActive = e.target.checked;
                if (e.target.checked) {
                    console.log(key + " is checked");
                } else {
                    console.log(key + " is unchecked");
                }
            });

            newValue.appendChild(checkbox);
            newValue.appendChild(document.createTextNode(todo[key].todo));
            todoList.appendChild(newValue);
        }
    }
    toggleFilter('all');
});


function toggleFilter(filter) {
    if (activeFilter === filter) {
        // 같은 필터를 두 번 클릭한 경우, 전체 필터로 변경하고 스타일 제거
        activeFilter = '';
        allShowButton.style.border = "none";
        noActiveButton.style.border = "none";
        activeButton.style.border = "none";
        inputButton.disabled = false;
    } else {
        // 새로운 필터를 클릭한 경우 해당 필터로 설정하고 해당 버튼에 스타일 적용
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