document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded and DOM fully parsed');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current User:', currentUser);

    if (currentUser) {
        // User is logged in
        document.querySelector('.nav-buttons').innerHTML = `
            <span>Bem-vindo, ${currentUser.nome}</span>
            <a href="#" id="logout" class="nav-button">Sair</a>
        `;
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    } else {
        // User is not logged in
        document.querySelector('.nav-buttons').innerHTML = `
            <a href="login.html" class="nav-button">Entrar</a>
            <a href="register.html" class="nav-button">Registar</a>
        `;
    }
});
