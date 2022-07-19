// Se Obtiene los pokemones
export function getPokemon({url}){
    return new Promise(function(resolve, reject){
        fetch(url)
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
    })
}

// Se Obtiene las url de los pokemones
export async function getAllPokemon(url){
    return new Promise(function(resolve, reject){
        fetch(url)
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
    })
}