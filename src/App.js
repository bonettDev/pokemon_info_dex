import React, { useState, useEffect } from 'react'
import { getPokemon, getAllPokemon } from './services/pokemon'
import PokemonComponent from './components/PokemonComponet'
import { Spinner, Modal, Button, Image, ProgressBar } from 'react-bootstrap'

function App(){

  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'


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

  function resetPokemon() {
    setLoading(true)
    async function fetchData(){
      let response = await getAllPokemon(initialUrl)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results)
      setLoading(false)
    }
    fetchData()
  }

  /**
  * @author boris_bonett
  * @since 2022-07-19
  * @description Pasar a la siguiente pagina de pokemones
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
    <div className='grid_template'>
      
      <header className='header'> 
        <h1>Información De <span>Pokemones</span></h1> 
      </header>
      {
        loading ? <div className='spinerPokemon'>
          <Spinner style={{ width: '5rem', height: '5rem' }} animation="border" variant="danger">
            <span className='visually-hidden'>Loading...</span>
          </Spinner></div> : (
          <>
            <div className="cardButton">
              <div>
                <button onClick={resetPokemon} className='cardButtonReset'>To reset</button>
              </div>
              <div>
                <button onClick={prev} className="cardButtonPrev">Prev</button>
              </div>
              <div>
                <button onClick={next} className="cardButtonNext">Next</button>
              </div>
            </div>

          <section className='section'>
            <PokemonComponent pokemonData={pokemonData} />
          </section>
          </>
        )
      }

      <footer className='footer'>
        <h1>Pokemon <span>@dev_nett99</span></h1>
      </footer>

    </div>
  );
}

export default App;
