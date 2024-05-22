
document.addEventListener('DOMContentLoaded', function() {
    const availablePoints = localStorage.getItem('points');
    const pointsElement = document.getElementById('user_points');
    pointsElement.textContent = `${availablePoints}`;
});
