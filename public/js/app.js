// API URL - change this to your deployed URL later
const API_URL = '';

// DOM Elements
const authContainer = document.getElementById('auth-container');
const taskContainer = document.getElementById('task-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const logoutBtn = document.getElementById('logout-btn');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

// Auth Functions
function setAuthToken(token) {
    localStorage.setItem('token', token);
}

function getAuthToken() {
    return localStorage.getItem('token');
}

function removeAuthToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

function isAuthenticated() {
    return !!getAuthToken();
}

// Show/Hide Forms
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
});

// Register
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            setAuthToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showTaskContainer();
            loadTasks();
        } else {
            alert(data.error || 'Registration failed');
        }
    } catch (error) {
        alert('Error connecting to server');
        console.error(error);
    }
});

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            setAuthToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showTaskContainer();
            loadTasks();
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        alert('Error connecting to server');
        console.error(error);
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    removeAuthToken();
    showAuthContainer();
});

// Show/Hide Containers
function showTaskContainer() {
    authContainer.style.display = 'none';
    taskContainer.style.display = 'block';
}

function showAuthContainer() {
    authContainer.style.display = 'block';
    taskContainer.style.display = 'none';
}

// Load Tasks
async function loadTasks() {
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const tasks = await response.json();
            renderTasks(tasks);
        } else if (response.status === 401) {
            removeAuthToken();
            showAuthContainer();
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Render Tasks
function renderTasks(tasks) {
    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">No tasks yet. Add one above!</div>';
        return;
    }

    taskList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task._id}">
            <div class="task-content">
                <div class="task-title ${task.completed ? 'completed-text' : ''}">${task.title}</div>
                ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
            </div>
            <div class="task-actions">
                <button class="btn-complete" onclick="toggleTask('${task._id}', ${!task.completed})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="btn-edit" onclick="editTask('${task._id}')">Edit</button>
                <button class="btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Add Task
addTaskBtn.addEventListener('click', async () => {
    const titleInput = document.getElementById('task-title');
    const descInput = document.getElementById('task-description');
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title) {
        alert('Please enter a task title');
        return;
    }

    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description: description || undefined })
        });

        if (response.ok) {
            titleInput.value = '';
            descInput.value = '';
            loadTasks();
        } else if (response.status === 401) {
            removeAuthToken();
            showAuthContainer();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

// Toggle Task Completion
window.toggleTask = async (taskId, completed) => {
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ completed })
        });

        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error toggling task:', error);
    }
};

// Edit Task
window.editTask = async (taskId) => {
    const newTitle = prompt('Enter new title:');
    if (newTitle === null) return;
    
    const newDescription = prompt('Enter new description (optional):');
    
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                title: newTitle.trim() || undefined,
                description: newDescription.trim() || undefined
            })
        });

        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error editing task:', error);
    }
};

// Delete Task
window.deleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

// Check Authentication on Load
if (isAuthenticated()) {
    showTaskContainer();
    loadTasks();
} else {
    showAuthContainer();
}

// Enter key support for adding tasks
document.getElementById('task-title').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});
