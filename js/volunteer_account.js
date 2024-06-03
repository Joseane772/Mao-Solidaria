document.addEventListener('DOMContentLoaded', function() {
    const availablePoints = localStorage.getItem('points');
    const pointsElement = document.getElementById('user_points');
    pointsElement.textContent = `${availablePoints}`;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email == 'admin@admin.pt') {
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
    if (currentUser) {
        // Populate user details
        document.getElementById('user_nome').textContent = currentUser.nome;
        document.getElementById('user_email').textContent = currentUser.email;
        document.getElementById('user_telefone').textContent = currentUser.telefone || 'N/A';
        document.getElementById('user_endereco').textContent = currentUser.endereco || 'N/A';
        document.getElementById('user_nascimento').textContent = currentUser.nascimento || 'N/A';
        document.getElementById('user_interesses').textContent = currentUser.interesses || 'N/A';

        // Populate user points (if applicable)
        const userPoints = currentUser.pontos || 0;
        document.getElementById('user_points').textContent = userPoints;

        // Populate user candidaturas
        const candidaturas = JSON.parse(localStorage.getItem('candidaturas')) || [];
        const userCandidaturas = candidaturas.filter(candidatura => candidatura.user === currentUser.email);
        
        const candidaturasContent = document.getElementById('candidaturas-content');
        if (userCandidaturas.length > 0) {
            userCandidaturas.forEach(candidatura => {
                const campanhaElement = document.createElement('div');
                campanhaElement.className = 'campanha';
                campanhaElement.innerHTML = `
                    <h3>${candidatura.campanha}</h3>
                `;
                candidaturasContent.appendChild(campanhaElement);
            });
        } else {
            candidaturasContent.innerHTML = '<p>Você não está registrado em nenhuma campanha.</p>';
        }

        // Edit button functionality
        document.getElementById('edit-button').addEventListener('click', function() {
            document.getElementById('profile').style.display = 'none';
            document.getElementById('edit-profile').style.display = 'block';

            document.getElementById('edit_nome').value = currentUser.nome;
            document.getElementById('edit_email').value = currentUser.email;
            document.getElementById('edit_telefone').value = currentUser.telefone || '';
            document.getElementById('edit_endereco').value = currentUser.endereco || '';
            document.getElementById('edit_nascimento').value = currentUser.nascimento || '';
            document.getElementById('edit_interesses').value = currentUser.interesses || '';
        });

        // Cancel edit button functionality
        document.getElementById('cancel-edit').addEventListener('click', function() {
            document.getElementById('profile').style.display = 'block';
            document.getElementById('edit-profile').style.display = 'none';
        });

        // Save edited information
        document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
            event.preventDefault();

            currentUser.nome = document.getElementById('edit_nome').value;
            currentUser.email = document.getElementById('edit_email').value;
            currentUser.telefone = document.getElementById('edit_telefone').value;
            currentUser.endereco = document.getElementById('edit_endereco').value;
            currentUser.nascimento = document.getElementById('edit_nascimento').value;
            currentUser.interesses = document.getElementById('edit_interesses').value;

            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Update the users array in localStorage
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }

            alert('Informações atualizadas com sucesso!');

            document.getElementById('profile').style.display = 'block';
            document.getElementById('edit-profile').style.display = 'none';

            // Update the displayed information
            document.getElementById('user_nome').textContent = currentUser.nome;
            document.getElementById('user_email').textContent = currentUser.email;
            document.getElementById('user_telefone').textContent = currentUser.telefone || 'N/A';
            document.getElementById('user_endereco').textContent = currentUser.endereco || 'N/A';
            document.getElementById('user_nascimento').textContent = currentUser.nascimento || 'N/A';
            document.getElementById('user_interesses').textContent = currentUser.interesses || 'N/A';
        });
    } else {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
    }
});
