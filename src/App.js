import React, { useState, useEffect } from 'react'
import { getPokemon, getAllPokemon } from './services/pokemon'
import PokemonComponent from './components/PokemonComponet'

function App(){

  const [ pokemonData, setPokemonData ] = useState([])
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=4'


  /**
  * @author boris_bonett
  * @since 2022-07-19
  * @description Obtener las url bases de los pokemones
  */
  useEffect(() => {
    setLoading(true)
    async function fetchData(){
      let response = await getAllPokemon(initialUrl)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results)
      setLoading(false)
    }
    fetchData()
  },[])

  /**
  * @author boris_bonett
  * @since 2022-07-19
  * @description Pasar al siguiente pagina de pokemones
  */
  async function next(){
    setLoading(true)
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false)
  }

  async function prev() {
    if(!prevUrl) return
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  }


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
    <div className='contenedor'>
        <header className="py-3"> 
        <h1>Información De <span>Pokemones</span></h1> 
      </header>

      <section>
        <h1>Section de Pokemones</h1>
      </section>

      <footer>
        <h1>Footer</h1>
      </footer>

    </div>
  );
}

export default App;
