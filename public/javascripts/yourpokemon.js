document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.release').forEach(button => {
        button.addEventListener('click', function () {
            const item = this.closest('.item');
            const nameElement = item.querySelector('.name1');
            const [type, name] = nameElement.innerText.split(' ');

            // Prepare data to send
            const pokemonData = {
                type: type.toLowerCase(),
                pokemon_name: name.toLowerCase()
            };

            // Send data to /release endpoint
            fetch('/release', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pokemonData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Server response:', data);
                    // Remove the item from the DOM
                    item.remove();
                })
                .catch(error => {
                    console.error('Error releasing Pokémon:', error);
                });
        });
    });
});
