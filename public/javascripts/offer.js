document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.offer-btn').forEach(button => {
        button.addEventListener('click', function () {
            const username = this.getAttribute('data-username');
            const pokemon = this.getAttribute('data-pokemon');

            // Handle the offer logic here
            console.log(`Offer ${pokemon} to ${username}`);
            // You can send a request to the server to handle the offer
        });
    });
});