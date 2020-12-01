import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Details from './Details';


const PokeCard = ({pokemon}) => {
  // Pictures(sprites), names, order numbers
    const pictures = pokemon.sprites;
    const name = pokemon.name;
    const order = pokemon.order;

  // Types
  const types = pokemon.types;
  const typesAdv = types.map(indTypes => {
      return (
          `${indTypes['type']['name']} `
          );
        }
  );
 
    return (
      <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}} key={pokemon.id}>
        <div className="card-header"><b>{name}</b></div>
          <div className="card-body">          
            <h6 className="card-subtitle mb-2 text-muted">
            Types: { typesAdv }
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">Order number: {order}</h6>  
            <img src={pictures['front_default']} alt="front-default"/>
            <img src={pictures['back_default']} alt="back-default"/>                     
          </div>
            <button type="button" className="btn btn-danger" id="margin">
              <a href="/details">More details</a>
            </button>
      </div>
  
  )
};


export default PokeCard;