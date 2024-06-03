document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded and DOM fully parsed');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log('Current User:', currentUser);
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

    const campaignsContainer = document.querySelector('main');
    let campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    // add the 3 example campaigns
    if (campaigns.length <= 3) {
        campaigns.push([
            {
                name: 'Associação Cais',
                desc: 'DINAMIZADOR - ATIVIDADE DE ALFABETIZAÇÃO ESCRITA E LEITURA',
                img: '../images/LOGOCAIS.jpg'
            },
            {
                name: 'Turn On Success',
                desc: 'OLUNTÁRIOS(AS) PARA NOS APOIAR NO NOSSO BAZAR SEMANAL.',
                img: '../images/logo-t-success.jpg'
            },
            {
                name: 'Aproximar Oeiras',
                desc: 'VOLUNTÁRIO/A PROFESSOR/A DE TEATRO',
                img: '../images/oeiras.png'
            }
        ]);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }
    
    console.log('Campaigns:', campaigns);
    campaigns.forEach(campaign => {
        const campaignElement = document.createElement('a');
        campaignElement.href = `detalhes.html?name=${encodeURIComponent(campaign.name)}&desc=${encodeURIComponent(campaign.desc)}&img=${encodeURIComponent(campaign.img)}`;
        campaignElement.className = 'botao';
        campaignElement.innerHTML = `
            <h2>${campaign.name}</h2>
            <img src="${campaign.img}" alt="Descrição da imagem" width="95" height="95">
            <p>${campaign.desc}</p>
        `;
        console.log('Campaign Element:', campaignElement);
        campaignsContainer.appendChild(campaignElement);
        const separator = document.createElement('p');
        campaignsContainer.appendChild(separator);
    });
});
