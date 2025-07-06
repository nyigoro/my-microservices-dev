// IMPORTANT: When running in Docker Compose, 'backend' is the hostname for the backend service.
// The port (8080) is the internal container port for the backend.
const API_BASE_URL = 'http://backend:8080/api'; // This URL works ONLY inside the Docker network

document.getElementById('fetchUsersBtn').addEventListener('click', fetchUsers);
document.getElementById('createUserForm').addEventListener('submit', createUser);

async function fetchUsers() {
    const usersOutput = document.getElementById('usersOutput');
    usersOutput.textContent = 'Fetching users...';
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        usersOutput.textContent = JSON.stringify(users, null, 2);
    } catch (error) {
        console.error('Error fetching users:', error);
        usersOutput.textContent = `Error: ${error.message}`;
    }
}

async function createUser(event) {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const usersOutput = document.getElementById('usersOutput');
    usersOutput.textContent = 'Creating user...';

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, ${errorData.error || 'Unknown error'}`);
        }

        const newUser = await response.json();
        usersOutput.textContent = `User created: ${JSON.stringify(newUser, null, 2)}`;
        form.reset(); // Clear form
        fetchUsers(); // Refresh the list of users
    } catch (error) {
        console.error('Error creating user:', error);
        usersOutput.textContent = `Error: ${error.message}`;
    }
}
