document.addEventListener('DOMContentLoaded', function() {
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


    // Get query parameters
    const params = new URLSearchParams(window.location.search);
    const campanhaNome = params.get('name');
    const campanhaDesc = params.get('desc');
    const campanhaImg = params.get('img');

    // Set campaign details
    document.getElementById('campanha-nome').textContent = campanhaNome;
    document.getElementById('campanha-descricao').textContent = campanhaDesc;
    document.getElementById('campanha-imagem').src = campanhaImg;

    // Handle "Candidatar" button click
    document.getElementById('candidatar').addEventListener('click', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Você precisa estar logado para se candidatar.');
            window.location.href = 'login.html';
            return;
        }

        let candidaturas = JSON.parse(localStorage.getItem('candidaturas')) || [];

        // check if user already applied to this campaign
        for (let i = 0; i < candidaturas.length; i++) {
            if (candidaturas[i].user == currentUser.email && candidaturas[i].campanha == campanhaNome) {
                alert('Você já se candidatou a esta campanha.');
                return;
            }
        }

        candidaturas.push({
            user: currentUser.email,
            campanha: campanhaNome
        });

        localStorage.setItem('candidaturas', JSON.stringify(candidaturas));
        alert('Candidatura realizada com sucesso!');
    });
});
