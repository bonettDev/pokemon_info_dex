import React, { useState, useEffect } from 'react'
import { getPokemon, getAllPokemon } from './services/pokemon'
import { Container } from 'react-bootstrap'
import PokemonComponent from './components/PokemonComponet'

function App(){

  const [ pokemonData, setPokemonData ] = useState([])
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'


  /**
  * @author boris_bonett
  * @since 2022-07-19
  * @description Obtener las url bases de los pokemones
  */
  useEffect(() => {
    async function fetchData(){
      let response = await getAllPokemon(initialUrl)
      await loadPokemon(response.results)
    }
    fetchData()
  },[])


  /**
  * @author boris_bonett
  * @since 2022-07-19
  * @description Obtener todos los pokemones
  */
  async function loadPokemon(data) {
    let _pokemonData = await Promise.all(data.map(async function(pokemon) {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData)
  }  


  return (
    <>
      <header className="py-3"> 
        <h1>Información De <span>Pokemones</span></h1> 
      </header>

      <Container>
        <PokemonComponent pokemonData={pokemonData} />
      </Container>
    </>
  );
}

export default App;
