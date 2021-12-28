window.onload = function () {
    fetchPokemons();
};


async function fetchPokemons() {
    try {
        let results = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
        let json = await results.json();
        // console.log(json.results);
        let html = ``;
        for (let i = 0; i < json.results.length; i++) {
            try {
                let pokemon = json.results[i];
                let result = await fetch(pokemon.url);
                pokemon = await result.json();
                console.log(pokemon);
                let image = pokemon.sprites.front_default;
                let name = pokemon.name;
                let abilities = '';
                let moves = '';
                let weight = pokemon.weight / 10;

                pokemon.abilities.forEach((e) => {
                    abilities = abilities + e.ability.name + ', ';
                });
                abilities = abilities.substring(0, abilities.length - 2);

                pokemon.moves.forEach((e) => {
                    moves = moves + e.move.name + ', ';
                });
                moves = moves.substring(0, moves.length - 2);

                console.log(name);
                console.log(image);
                console.log(pokemon);

                html = html + `<div class="col-md-12 " style="background-color:#fff">
        <div class="card p-3">
            <div class="d-flex flex-row mb-3"><img src="`+ image + `" width="150">
                <div class="d-flex flex-column ml-2"><h2>`+ (i + 1) + `. ` + name.toUpperCase() + `</h2><span class="Abilities"><i class="fa fa-star"></i><i
                            class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span>
                </div>
            </div>
            <h4>Abilities</h4>
            <p>` + abilities + `</p>
            <h4>Moves</h4>
            <p>` + moves + `</p>
            <h4>Weight: ` + weight + ` kg</h4>
            <h1> </h1>
             </div>
        </div>`;
            } catch (e) {
                break;
            }
        }

        let gridView = document.getElementById('gridView');
        gridView.innerHTML = html;
    } catch (e) {
        alert('Something went wrong');
    }
}

