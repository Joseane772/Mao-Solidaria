document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', function() {
            const clickedId = this.id;
            alert('link with id ' + clickedId);
        });
    });
});
