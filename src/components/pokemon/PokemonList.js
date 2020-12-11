import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Styled from 'styled-components';
import PokemonCard from './PokemonCard';

const Button = Styled.button`
  font-weight: bold;
  font-size: 25px;
  border-radius: 10px;
  background-color: #ef5350 !important;
  border: 1px solid white;
  &:hover {
    border: 2px solid grey;
  }
`

const PokemonList= () => {
  const [ url, setUrl ] = useState("https://pokeapi.co/api/v2/pokemon?offset=offset&limit=loadNumber");
  const [pokemon, setPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const loadNumber = 52;


  function getNextOffset() {
    return offset + loadNumber;
  }

  // setState is asynchronous so I will not see the change straight away in console.log. The useState Hook does not have a second callback argument like the old this.setState. Instead, we use the useEffect Hook.
 function handleClick() {
    const newOffset = getNextOffset();
      setOffset(newOffset);
    }

    async function getMorePokemon() {
      setUrl("https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + loadNumber);
      const res = await axios.get(url);
      return setPokemon(res.data['results']);
    }

    useEffect(() => {
      console.log('Offset: ' + offset)
      getMorePokemon();
    }, [offset])

  return (
    <>
      <div>
        {pokemon ? (
        <div className="row">
          {pokemon.map(pokemon => (
          <PokemonCard data-testid="pokemoncard" key={pokemon.name} name={pokemon.name} url={pokemon.url}/>
          ))}
          </div>
        ) : (<h1>Loading pokemon</h1>
        )}
      </div>
      <Button data-testid="button" type="button" className="btn btn-info btn-block" onClick={handleClick}>Load More</Button>
      </>
  )
} 

export default PokemonList;