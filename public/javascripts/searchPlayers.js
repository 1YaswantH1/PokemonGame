document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchQuery');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function () {
        const query = searchInput.value;

        if (query.length > 0) {
            fetch(`/search?searchQuery=${query}`)
                .then(response => response.json())
                .then(data => {
                    searchResults.innerHTML = '';
                    data.usernames.forEach(username => {
                        const userDiv = document.createElement('div');
                        userDiv.classList.add('user-item');
                        userDiv.innerHTML = `<h3>${username}</h3>`;
                        userDiv.addEventListener('click', () => {
                            window.location.href = `/offer?username=${username}`;
                        });
                        searchResults.appendChild(userDiv);
                    });
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        } else {
            searchResults.innerHTML = '';
        }
    });

    document.addEventListener('click', function (event) {
        if (!searchResults.contains(event.target) && event.target !== searchInput) {
            searchResults.innerHTML = '';
        }
    });
});