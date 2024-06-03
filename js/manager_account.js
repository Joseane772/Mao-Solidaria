document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded and DOM fully parsed');
    const currentUser = JSON.parse(localStorage.getItem('admin'));

    console.log('Current User:', currentUser);
    if (!currentUser || !currentUser.emil=='admin@admin.pt' || !currentUser.password=='admin') {
        alert('Você não tem permissão para acessar esta página.');
        window.location.href = '../index.html';
        return;
    }

    
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
        console.log('User is not logged in');
        document.querySelector('.nav-buttons').innerHTML = `
            <a href="login.html" class="nav-button">Entrar</a>
            <a href="register.html" class="nav-button">Registar</a>
        `;
    }
    // Populate user details
    document.getElementById('user_nome').textContent = currentUser.nome;
    document.getElementById('user_email').textContent = currentUser.email;
    document.getElementById('user_telefone').textContent = currentUser.telefone || 'N/A';
    document.getElementById('user_endereco').textContent = currentUser.endereco || 'N/A';
    document.getElementById('user_nascimento').textContent = currentUser.nascimento || 'N/A';
    document.getElementById('user_organizacao').textContent = currentUser.organizacao || 'N/A';
    document.getElementById('user_campanhas_ativas').textContent = currentUser.campanhasAtivas || 'N/A';
    document.getElementById('user_campanhas_concluidas').textContent = currentUser.campanhasConcluidas || 'N/A';

    // Edit button functionality
    document.getElementById('edit-button').addEventListener('click', function() {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('edit-profile').style.display = 'block';

        document.getElementById('edit_nome').value = currentUser.nome;
        document.getElementById('edit_email').value = currentUser.email;
        document.getElementById('edit_telefone').value = currentUser.telefone || '';
        document.getElementById('edit_endereco').value = currentUser.endereco || '';
        document.getElementById('edit_nascimento').value = currentUser.nascimento || '';
        document.getElementById('edit_organizacao').value = currentUser.organizacao || '';
        document.getElementById('edit_campanhas_ativas').value = currentUser.campanhasAtivas || '';
        document.getElementById('edit_campanhas_concluidas').value = currentUser.campanhasConcluidas || '';
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
        currentUser.organizacao = document.getElementById('edit_organizacao').value;
        currentUser.campanhasAtivas = document.getElementById('edit_campanhas_ativas').value;
        currentUser.campanhasConcluidas = document.getElementById('edit_campanhas_concluidas').value;

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
        document.getElementById('user_organizacao').textContent = currentUser.organizacao || 'N/A';
        document.getElementById('user_campanhas_ativas').textContent = currentUser.campanhasAtivas || 'N/A';
        document.getElementById('user_campanhas_concluidas').textContent = currentUser.campanhasConcluidas || 'N/A';
    });

    // Create new campaign
    document.getElementById('create-campaign-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const desc = document.getElementById('desc').value;
        const img = document.getElementById('img').value;

        const newCampaign = {
            name,
            desc,
            img
        };

        let campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        campaigns.push(newCampaign);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));

        alert('Campanha criada com sucesso!');
        window.location.href = 'oportunidade.html';
    });
});
