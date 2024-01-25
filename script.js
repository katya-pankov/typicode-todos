const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = () => {
    //limit the number of data to 5 to avoid long list
    fetch(apiUrl + '?_limit=5')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((todo) => addTodoToDOM(todo));
        });
};

const addTodoToDOM = (todo) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute('data-id', todo.id);

    if (todo.completed) {
        div.classList.add('done');
    }

    document.getElementById('todo-list').appendChild(div);
};

const createTodo = (e) => {
    e.preventDefault();

    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => addTodoToDOM(data))
};

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createTodo);
};

init();