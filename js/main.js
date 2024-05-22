
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('points')) {
        localStorage.setItem('points', 5000); // Set the initial points to 5000
    }
});
