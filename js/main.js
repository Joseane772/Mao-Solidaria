
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('points') || localStorage.getItem('points') === '0'){
        localStorage.setItem('points', 5000); // Set the initial points to 5000
    }

    // admin user
    const admin = {
        nome: 'Admin',
        email: 'admin@admin.pt',
        password: 'admin',
        endereco: 'N/A',
        telefone: 'N/A',
        nascimento: 'N/A',
        interesses: 'N/A',
        pontos: 0
    };
    localStorage.setItem('admin', JSON.stringify(admin));
    


    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email === 'admin@admin.pt') {
        // User is logged in
        document.querySelector('.nav-buttons').innerHTML = `
            <a href='paginas/manager_account.html'>${currentUser.nome}</a>
            <a href="#" id="logout" class="nav-button">Sair</a>
        `;
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        });
    } else if(currentUser){
        // User is logged in
        document.querySelector('.nav-buttons').innerHTML = `
            <a href='paginas/volunteer_account.html'>${currentUser.nome}</a>
            <a href="#" id="logout" class="nav-button">Sair</a>
        `;
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        });
    } else {
        // User is not logged in
        document.querySelector('.nav-buttons').innerHTML = `
            <a href="paginas/login.html" class="nav-button">Entrar</a>
            <a href="paginas/register.html" class="nav-button">Registar</a>
        `;
    }
});
