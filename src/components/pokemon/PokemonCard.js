import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Styled from 'styled-components';
import spinner from './spin.svg';

const Sprite = Styled.img`
  width: 10em;
  display: none;
`
const Card = Styled.div`
      box-shadow: 0 1px 3px rgbaa(0,0,0,0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0 ,0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      }
      -moz-user-select: none;
      -website-user-select: none;
      user-select: none;
      -o-user-select: none;
`

const StyledLink = Styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`

function PokemonCard(props) {
  const [ pokemonIndex, setPokemonIndex ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  const [imageLoading, setImageLoading ] = useState(true);
  const [tooManyRequests, setTooManyRequests ] = useState(false);

  const { name, url } = props;

  useEffect(() => {
    setPokemonIndex(`${url ? url.split('/')[url.split('/').length - 2] : 0}`);
    setImageUrl(`${imageUrl ? "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/" + pokemonIndex + ".png?raw=true" : null}`)
  }, [url, pokemonIndex, imageUrl]);

    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${pokemonIndex}`}>
        <Card className="card">
          <h5 className="card-header">#{pokemonIndex}</h5>
          {imageLoading ? (
            <img src={spinner} style={{width: '5em', height: '5em'}} className="card-img-top rounder mx-auto d-block mt-2" alt="loader"/>
          ) : null}
          <Sprite
            className="card-img-top rounder mx-auto mt-2"
            onLoad={() => setImageLoading(!imageLoading)}
            onError={() => setTooManyRequests(true)}
            src={imageUrl}
            style={
              tooManyRequests ? {display: "none"} :
              imageLoading ? null: {display: "block"}
          }
          />
          {tooManyRequests ? (<h6 className="mx-ato"><span className="badge badge-danger mt-2">Too Many Requests</span></h6>) : null}
          <div className="card-body mx-auto">
            <h6 className="card-title ">
            {name && name
              .toLowerCase()
              .split(' ')
              .map(
                letter => letter.charAt(0).toUpperCase() + letter.substring(1)
              )
              .join(' ')}
            </h6>
          </div>
        </Card>
        </StyledLink>
        </div>
        )
}

export default PokemonCard;