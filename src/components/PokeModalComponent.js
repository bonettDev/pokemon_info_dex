import React, { useEffect } from "react";
import { Modal, Button, Image, ProgressBar } from "react-bootstrap";

function PokeModalComponent({ pokemonInfoModal, show, handleClose }) {



  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pokemonInfoModal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
        <div style={{ width: '40%' }}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfoModal.id}.png`}
            style={{ width: '100%' }}
          />
          <div style={{ width: '100%' }}>
            {
                pokemonInfoModal.length === 0 ? '' : 
                pokemonInfoModal.types.map(function(res, i){
                    return(<div key={i} className="divCero">{res.type.name}</div>)
                })
            }
          </div>

        </div>
          <div style={{ width: '40%' }}>
            {pokemonInfoModal.length === 0 ? '' : 
                pokemonInfoModal.stats.map(function(value,index){
                    return(
                        <div key={index} >
                          <p>{value.stat.name}</p>
                          <ProgressBar striped variant="danger" label={`${value.base_stat}%`} animated now={value.base_stat} />
                        </div>
                    )
                }) 
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PokeModalComponent;
