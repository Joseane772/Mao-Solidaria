
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded and DOM fully parsed');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current User:', currentUser);
    if (currentUser && currentUser.email == 'admin@admin.pt') {
        // User is logged in
        console.log('Admin logged in');
        document.querySelector('.nav-buttons').innerHTML = `
            <a href='manager_account.html'>${currentUser.nome}</a>
            <a href="#" id="logout" class="nav-button">Sair</a>
        `;
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        });
    } else if(currentUser){
        // User is logged in
        document.querySelector('.nav-buttons').innerHTML = `
            <a href='volunteer_account.html'>${currentUser.nome}</a>
            <a href="#" id="logout" class="nav-button">Sair</a>
        `;
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        });
    } else {
        // User is not logged in
        document.querySelector('.nav-buttons').innerHTML = `
            <a href="login.html" class="nav-button">Entrar</a>
            <a href="register.html" class="nav-button">Registar</a>
        `;
    }

    console.log('Login page loaded');
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Login form submitted');

        // Get form data
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        

        console.log('Form data:', { email, password });

        // Get existing users from localStorage
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var admin = JSON.parse(localStorage.getItem('admin'));


        // Check if user exists and password matches
        var user = users.find(function(existingUser) {
            return existingUser.email === email && existingUser.password === password;
        });

        if (user) {
            // Store current user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Show success popup
            alert('Login bem-sucedido!');
            // Redirect to a protected page or dashboard
            window.location.href = 'volunteer_account.html'; // Change to your actual dashboard page
        }else if (email == admin.email && password == admin.password){
            localStorage.setItem('currentUser', JSON.stringify(admin));
            alert('Login bem-sucedido!');
            window.location.href = 'manager_account.html';
        }else{
            // Show error message
            alert('Email ou palavra-chave incorretos. Tente novamente.');
        
        }
        
        
    });
});
