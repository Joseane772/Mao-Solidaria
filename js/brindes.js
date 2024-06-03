document.addEventListener('DOMContentLoaded', function() {


    const links = document.querySelectorAll('a');

    const availablePoints = localStorage.getItem('points');
    const pointsElement = document.getElementById('points-display');
    pointsElement.textContent = `Os teus pontos : ${availablePoints}`;


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



    links.forEach(link => {
        link.addEventListener('click', function() {
            const clickedId = this.id;

            // if the currentUser does not have a endereco redirect to volunteer_account.html
            if (currentUser.endereco == 'N/A') {
                console.log('Não tem um endereço definido, por favor defina um endereço na sua conta para poder receber os brindes.');
                alert('Não tem um endereço definido, por favor defina um endereço na sua conta para poder receber os brindes.');
                window.location.href = 'volunteer_account.html';
                return;
            }

            switch (clickedId) {
                case '1':
                    if (deductPoints(1000)) {
                        alert('T-shirt Brinde sera enviado para a sua morada');
                    }else {
                        alert('Pontos insuficientes');
                    }
                    break;
                case '2':
                    if (deductPoints(500)) {
                        alert('Chavena Brinde sera enviado para a sua morada');
                    }else {
                        alert('Pontos insuficientes');
                    }
                    break;
                case '3':
                    if (deductPoints(1500)) {
                        alert('Caneta Brinde sera enviado para a sua morada');
                    }else {
                        alert('Pontos insuficientes');
                    }
                    break;
                default:
                    break;
            }
        });
    });
});

function deductPoints(points) {
    // Get the current points from local storage
    let currentPoints = localStorage.getItem('points');

    if (currentPoints < points) {
        return false;
    }

    // Deduct the points
    currentPoints -= points;
    localStorage.setItem('points', currentPoints);
    const pointsElement = document.getElementById('points-display');
    pointsElement.textContent = `Os teus pontos : ${currentPoints}`;
    return true
}
