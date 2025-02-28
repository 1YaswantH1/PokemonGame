let next = document.querySelector('#next')
let decision = document.querySelector('#decision')
let pokemon_name = document.querySelector('p')
let pokemon_container = document.querySelector('.caught')
let array = []
decision.className = 'decision'
let catch1 = document.querySelector('#catch')
let img = document.querySelectorAll('img')
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=2000";
next.addEventListener("click", function () {

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let type = ["normal", "shiny"]
            const allPokemonNames = data.results.map(pokemon => pokemon.name);
            let a = `${Math.floor(Math.random() * 1100) + 1}`
            let b = `${Math.floor(Math.random() * 2)}`

            // img[1].src = `https://img.pokemondb.net/artwork/${allPokemonNames[a]}.jpg`
            // pokemon_name.innerText = `${allPokemonNames[a]}`.toUpperCase()

            img[1].src = `https://img.pokemondb.net/sprites/home/${type[b]}/2x/${allPokemonNames[a]}.jpg`;
            pokemon_name.innerText = `${type[b]} ${allPokemonNames[a]}`.toLocaleUpperCase()

            // img[1].src = `https://i.dstatic.com/images/pokemon/front/retro/${allPokemonNames[a]}.png`;
            // img[1].src ==`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${a}.png`
            pokemon_name.style.fontWeight = 'bold'

        })

})
catch1.addEventListener('click', function () {
    let try_pokemon_catch = Math.floor(Math.random() * 2);
    let pname = pokemon_name.innerText.toLowerCase();
    decision.style.fontWeight = "bolder"
    decision.style.fontSize = "1.4em"
    let pokemon_store = pname.split(" ")
    console.log(pokemon_store[0])
    console.log(pokemon_store[1])

    if ((Math.floor(Math.random() * 3) + 1) === 1) {
        let div1 = document.createElement('div');
        let name_1 = document.createElement('p');
        div1.classList.add('item');
        name_1.className = 'name1';
        pokemon_container.append(div1);
        let y = document.createElement('img');
        y.src = `https://img.pokemondb.net/sprites/home/${pokemon_store[0]}/2x/${pokemon_store[1]}.jpg`;
        div1.append(y);
        name_1.innerText = `${pokemon_store[0]} ${pokemon_store[1]}`;
        name_1.style.fontWeight = 'bolder';
        name_1.style.backgroundColor = 'whitesmoke';
        div1.append(name_1);
        decision.innerText = `Congratulations! You caught the ${pokemon_store[0]} ${pokemon_store[1]}!`;

        // Prepare data to send
        const pokemonData = {
            type: pokemon_store[0],
            pokemon_name: pokemon_store[1]
        };

        // Send data to /try endpoint
        fetch('/try', {
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
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });

        chances = 0;
        next.click();
        return;
    } else {
        decision.innerText = `Almost had it! The ${pokemon_store[0]} ${pokemon_store[1]} broke free at the last moment`;
    }

    chances += 1;

    if (chances === try_pokemon_catch) {
        decision.innerText = `Oh no! The ${pokemon_store[0]} ${pokemon_store[1]} fled! Better luck next time.`;
        chances = 0;
        next.click();
    }



});


document.addEventListener('keydown', function (e) {
    if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp" || e.key == "ArrowDown") {
        next.click()
    }
})
document.addEventListener('keydown', function (e) {
    if (e.key == "Enter") {
        catch1.click()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const nameContainer = document.getElementById('name-container');
    adjustFontSize(nameContainer);
});

window.onload = function () {
    next.click()
};

function adjustFontSize(element) {
    const maxWidth = 256;
    let fontSize = parseInt(window.getComputedStyle(element).fontSize, 10);
    const nameLength = element.textContent.length;

    while (element.scrollWidth > maxWidth && fontSize > 1) {
        fontSize--;
        element.style.fontSize = fontSize + 'px';
    }
}