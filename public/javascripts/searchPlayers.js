document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchQuery');
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    searchInput.parentNode.appendChild(dropdown);

    searchInput.addEventListener('input', function () {
        const query = searchInput.value;

        if (query.length > 0) {
            fetch(`/search?searchQuery=${query}`)
                .then(response => response.json())
                .then(data => {
                    dropdown.innerHTML = '';
                    data.usernames.forEach(username => {
                        const option = document.createElement('div');
                        option.classList.add('dropdown-item');
                        option.textContent = username;
                        option.addEventListener('click', () => {
                            searchInput.value = username;
                            dropdown.innerHTML = '';
                        });
                        dropdown.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        } else {
            dropdown.innerHTML = '';
        }
    });

    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target) && event.target !== searchInput) {
            dropdown.innerHTML = '';
        }
    });
});