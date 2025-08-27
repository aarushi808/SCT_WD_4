let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (task.completed ? ' completed' : '');
    li.innerHTML = `
      <span class="task-text" contenteditable="false">${task.text}</span>
      <span class="task-date">${task.date ? new Date(task.date).toLocaleString() : ''}</span>
      <div class="btn-group">
        <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="edit">Edit</button>
        <button class="save" style="display:none;">Save</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Complete/Undo
    li.querySelector('.complete').onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    // Edit
    li.querySelector('.edit').onclick = () => {
      li.querySelector('.task-text').contentEditable = true;
      li.querySelector('.save').style.display = '';
      li.querySelector('.edit').style.display = 'none';
      li.querySelector('.task-text').focus();
    };

    // Save
    li.querySelector('.save').onclick = () => {
      const newText = li.querySelector('.task-text').textContent.trim();
      if (newText.length === 0) {
        alert("Task can't be empty");
        return;
      }
      task.text = newText;
      li.querySelector('.task-text').contentEditable = false;
      li.querySelector('.save').style.display = 'none';
      li.querySelector('.edit').style.display = '';
      saveTasks();
      renderTasks();
    };

    // Delete
    li.querySelector('.delete').onclick = () => {
      tasks = tasks.filter((t) => t !== task);
      saveTasks();
      renderTasks();
    };

    taskList.appendChild(li);
  });
}

// Add Task
addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  if (!text) {
    alert('Please enter a task.');
    return;
  }
  tasks.push({
    text,
    date,
    completed: false,
  });
  taskInput.value = '';
  taskDate.value = '';
  saveTasks();
  renderTasks();
};

renderTasks();
