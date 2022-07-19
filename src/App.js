import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import PokemonComponent from './components/PokemonComponet'
import axios from 'axios'

const App = () => {

  const [ pokemonUrl, setPokemonUrl ] = useState([])


  useEffect(() => {
    obtenerUrlInicialesPokemones()
  }, [])

  /**
  * @author boris_bonett
  * @since 2022-07-19
  * @description Obtener las url bases de los pokemones
  */

  const obtenerUrlInicialesPokemones = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
    await axios.get(url)
    .then(response => {
      const { data } = response
      //console.log(data.results)
      loadPokemon(data.results)
    })
    .catch(error =>{
      console.log(error)
    })
  }

  const loadPokemon = async (data) => {
    //console.log(data)
    let referenceArray = []
    await data.map( pokemon => {
      let pokemonRecord = axios(pokemon.url)
        .then(response => {
          //console.log(response.data)
          referenceArray.push(response.data)
        })
        .catch(error => {
        console.log(error)
      })
    })
    setPokemonUrl(referenceArray)
  } 


  return (
    <>
      <header className="py-3"> 
        <h1>Información De <span>Pokemones</span></h1> 
      </header>

      <Container>
        <PokemonComponent  pokemonUrl={pokemonUrl}/>
      </Container>
    </>
  );
}

export default App;
