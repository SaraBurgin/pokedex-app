import React from 'react';

const PokeCard = ({pokemon}) => {
  // Abilities
  // const abilities = pokemon.abilities;

  // Types
  const types = pokemon.types;
  const typesAdv = types.map(indTypes => {
      return (
          `${indTypes['type']['name']} `
          );
        }
  );

  // Sprites
  const sprites = pokemon.sprites;

    return (
    <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}} key={pokemon.id}>
    <div className="card-header"><b>{pokemon.name}</b></div>
    <div className="card-body">          
      <h6 className="card-subtitle mb-2 text-muted">
       Types: { typesAdv }
      </h6>
      <h6 className="card-subtitle mb-2 text-muted">Order number: {pokemon.order}</h6>  
      <img src={sprites['front_default']} alt="front-default"/>
      <img src={sprites['back_default']} alt="back-default"/>                       
    </div>
  </div>
  )
};

export default PokeCard;