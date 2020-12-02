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
  // console.log(types[1]);

  // if(types.length === 2) {
  //   const prevTypesAdv = types.map(indTypes => {
  //     return (`${indTypes['type']['name']} `)
  //     });
  //   const typesAdv = prevTypesAdv[0] + prevTypesAdv[0];
  //     console.log(typesAdv);
  // } else {

  // }

  const typesAdv = types.map(indTypes => {
    // console.log(indTypes['slot']);
      return (
          `${indTypes['type']['name']} ` 
          );
        }
  )
 
    return (
      <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}} key={pokemon.id}>
        <div className="card-header">
          <img className="card-img-top" src={pictures['front_default']} alt="front-default" style={{"width" : "100px"}}/>
          <div className="card-body">
            <h5 className="card-title"><b>{name}</b></h5>      
            <h6 className="card-subtitle mb-2 text-muted" id="coloured-box">
            {typesAdv.map(function (indTypes, index) {
              return (
                <>
                <div className={indTypes} key={indTypes.id}>
                  {indTypes}
                  </div>
                </>
              )
            })}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted"># {order}</h6>  
          </div>
            <button type="button" className="btn btn-danger" id="margin">
              <a href="/details">More details</a>
            </button>
          </div>
      </div>
  
  )
};


export default PokeCard;