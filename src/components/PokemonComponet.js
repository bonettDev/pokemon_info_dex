import React, {useEffect, useState} from "react"
import PokeModalComponent from "./PokeModalComponent"

function PokemonComponent({pokemonData}){

    const [show, setShow] = useState(false);
    const [pokemonInfoModal, setPokemonInfoModal] = useState([])

    function handleClose() {
        setShow(false);
    }

    function handleShow() {
        setShow(true)
    }


    return(
        <div className="cardContainer">
            <div className="cardSon">
                {
                    pokemonData.map(function(values, index) {
                        return (
                            <div className="card" key={values.id} onClick={() =>{
                                setPokemonInfoModal(values)
                                handleShow()
                            }} >
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${values.id}.png`} />
                                <p>{values.name}</p>
                                {values.types.map(function(res, i) {
                                    return (
                                        <div key={i} className="divCero">{res.type.name}</div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
            <PokeModalComponent pokemonInfoModal={pokemonInfoModal} show={show} handleClose={handleClose} />
        </div>
    )
}

//<Spinner animation="border" variant="primary"/>

export default PokemonComponent