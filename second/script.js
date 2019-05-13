const urlPeople = 'https://swapi.co/api/people';

const people = document.getElementById('people');
const profile = document.getElementById('profile');
const homeworld = document.getElementById('homeworld');
const species = document.getElementById('species');
const movies = document.getElementById('movies');

let divProfile = createNode('div'),
    divHomeworld = createNode('div'),
    divSpecies = createNode('div'),
    divMovies = createNode('div');

function createNode(element) {
    return document.createElement(element);
}

function append(parent, child) {
    return parent.appendChild(child);
}

let i = 0;

fetch(urlPeople)
    .then(res => res.json())
    .then(function(data) {
        let parts = data.results;
        return parts.map(function(part) {
            let li = createNode('li');  
            li.innerHTML = part.name;
            let idName = 'name-' + i++;
            li.setAttribute('id', idName);
            append(people, li);
        })
    })
    .catch(function(error) {
        return console.log('An error occured: ', error);
    });

document.getElementById('people').addEventListener('click', function(e) {
        fetch(urlPeople)
            .then(res => res.json())
            .then(function(data) {
                    let id = e.target.id;
                    id = id.substring(id.indexOf('-') + 1);
                    getProfile(id, data);
            })
});

function getProfile(id, data) {
    divProfile.innerHTML = 
        'Birth year: ' + data.results[id].birth_year + '<br>' +
        'Gender: ' + data.results[id].gender + '<br>' +
        'Height: ' + data.results[id].height + ' cm <br>' +
        'Hair color: ' + data.results[id].hair_color + ' <br>' +
        'Eye color: ' + data.results[id].eye_color + ' <br>';
    append(profile, divProfile);
    let homeWorld = data.results[id].homeworld;
    getHomeworld(homeWorld);
    let speciesList = data.results[id].species;
    speciesList.forEach(sl => {
        getSpecies(sl);
    });
    let movieList = data.results[id].films;
    movieList.forEach(ml => {
        getMovies(ml);
    });
}

function getHomeworld(hw) {
    fetch(hw)
            .then(res => res.json())
            .then(function(data) {
                divHomeworld.innerHTML =
                    'Name: ' + data.name + '<br>' +
                    'Climate: ' + data.climate + '<br>' +
                    'Terrain: ' + data.terrain + '<br>' +
                    'Surface water: ' + data.surface_water + '<br>' +
                    'Population: ' + data.population + '<br>' ;
                append(homeworld, divHomeworld);
            })
};

function getSpecies(spec) {
    divSpecies.innerHTML = '';
    fetch(spec)
            .then(res => res.json())
            .then(function(data) {
                let div = createNode('div');
                div.innerHTML =
                    'Name: ' + data.name + '<br>' +
                    'Classification: ' + data.classification + '<br>' +
                    'Average height: ' + data.average_height + '<br>' +
                    'Average lifespan: ' + data.average_lifespan + '<br>' +
                    'Language: ' + data.language + '<br>' ;
                append(divSpecies, div);
            });
    append(species, divSpecies);
};

function getMovies(movie) {
    divMovies.innerHTML = '';
    fetch(movie)
            .then(res => res.json())
            .then(function(data) {
                let div = createNode('div');
                div.innerHTML =
                    'Title: ' + data.title + '<br>' +
                    'Episode: ' + data.episode_id + '<br>' +
                    'Director: ' + data.director + '<br>' +
                    'Producer: ' + data.producer + '<br>' +
                    'Release date: ' + data.release_date + '<br>' ;
                append(divMovies, div);
            });
    append(movies, divMovies);
};