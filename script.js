// Getting UI elements
const inputField = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Initialize tasks from storage or empty array
let tasks = JSON.parse(localStorage.getItem('my_tasks')) || [];

// Function to render the list on screen
function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span class="task-text ${task.done ? 'completed' : ''}" onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <span class="delete-link" onclick="deleteTask(${index})">Remove</span>
        `;
        
        todoList.appendChild(li);
    });
    
    // Always update localstorage after rendering
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
}

// Logic to add a new task
function handleAddTask() {
    const val = inputField.value.trim();
    
    if (val === "") {
        alert("Hey, you can't add an empty task!");
        return;
    }
    
    tasks.push({ text: val, done: false });
    inputField.value = ''; // clear input
    renderTasks();
}

// Mark as done/undone
window.toggleTask = (index) => {
    tasks[index].done = !tasks[index].done;
    renderTasks();
};

// Remove task from list
window.deleteTask = (index) => {
    if(confirm("Are you sure you want to delete this?")) {
        tasks.splice(index, 1);
        renderTasks();
    }
};

// Event Listeners
addButton.addEventListener('click', handleAddTask);

// Support "Enter" key to add task
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddTask();
    }
});

// Initial load
renderTasks();