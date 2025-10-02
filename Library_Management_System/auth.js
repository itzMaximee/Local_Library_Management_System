const admins = [
    { username: "admin1", password: "password123" },
    { username: "admin2", password: "admin2024" }
];


function signIn() {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    const isAdmin = admins.some(admin => admin.username === username && admin.password === password);

    if (isAdmin) {
        localStorage.setItem('currentUser', JSON.stringify({ username, role: 'admin' }));
        window.location.href = 'admindashboard.html'; 
    } else {
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username && user.password === password);

        if (userExists) {
            localStorage.setItem('currentUser', JSON.stringify({ username, role: 'user' }));
            window.location.href = 'Mainpage.html'; 
        } else {
            alert('Invalid username or password');
        }
    }
}



function signUp() {
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const contact = document.getElementById('signup-contact').value;
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const newUser = { firstName, lastName, contact, email, username, password };

    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    
    localStorage.setItem('currentUser', JSON.stringify({ username, role: 'user' }));

    
    window.location.href = 'Mainpage.html';
}



function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signinandsignuppage.html';
}


function checkAdminAccess() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Access denied. Admins only.');
        window.location.href = 'Mainpage.html';
    }
}
