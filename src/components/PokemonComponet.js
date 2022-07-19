import React from "react"
import axios from 'axios'

const PokemonComponent = ({pokemonUrl}) => {

    return(
        <>
            <h1>Pokemon Component</h1>
            <div>
            {pokemonUrl.map(values => (
                <li key={values.id}>{values.name}</li>
            ))}
            </div>
        </>
    )
}

export default PokemonComponent