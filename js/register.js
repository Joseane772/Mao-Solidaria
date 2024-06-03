document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded and DOM fully parsed');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email === 'admin@admin.pt') {
        // User is logged in
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

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Form submitted');

        // Get form data
        var nome = document.getElementById('nome').value;
        var apelido = document.getElementById('apelido').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        

        // Create user object
        var user = {
            nome: nome,
            apelido: apelido,
            email: email,
            password: password,
            endereco: 'N/A',
            telefone: 'N/A',
            nascimento: 'N/A',
            interesses: 'N/A',
            pontos: localStorage.getItem('points')
        };

        // Get existing users from localStorage
        var users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Existing users:', users);

        // Check if user already exists
        var userExists = users.some(function(existingUser) {
            return existingUser.email === email;
        });

        if (userExists) {
            alert('Usuário já registrado com este e-mail.');
            return;
        }

        // Add new user to the list of users
        users.push(user);

        // Store updated users list in localStorage
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Updated users list:', users);

        // Show confirmation alert
        alert('Registro bem-sucedido!');

        // Redirect to login page
        window.location.href = 'login.html';
    });
});
