document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', function() {
            const clickedId = this.id;

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

   return true
}
