import React, { useState, useEffect } from 'react'
import axios from 'axios';
import spinner from './spin.svg'

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

function Pokemon(props) {
  const [stats, setStats] = useState({
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    specialAttack: '',
    specialDefense: '',
  });
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const [abilities, setAbilities] = useState('');
  const [evol1, setEvol1] = useState('');
  const [evol2, setEvol2] = useState('');
  const [evol3, setEvol3] = useState('');
  const [imageUrl, setImageUrl] = useState('')

    // this will go to the url and grab the pokemonIndex we included in our params at App.js and put it in our pokemonIndex here
    const {pokemonIndex} = props.match.params;

    async function getPokemonInfo() {
      // #Information url
     const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
      // Get pokemon information: name, image, stats, moves, types, abilities, evs
      const getPokemon = await axios.get(pokemonUrl);
      const pokemonRes = getPokemon.data;
      const name = pokemonRes.name;
      let { hp, attack, defense, speed, specialAttack, specialDefense} = '';

      return (
        <>
        {setImageUrl(`${name ? "https://img.pokemondb.net/sprites/home/normal/" + name + ".png" : null}`)};
        {setMoves(pokemonRes.moves.map(move => 
        move.move.name
        ))}
        {setTypes(pokemonRes.types.map(type => type.type.name))};
        {setAbilities(pokemonRes.abilities.map(ability => { return ability.ability.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
          }).join(', '))};
          {pokemonRes.stats.forEach(stat => {
                  switch(stat.stat.name) {
                      case 'hp':
                      hp = stat['base_stat'];
                      break;
                    case 'attack':
                      attack = stat['base_stat'];
                      break;
                    case 'defense':
                      defense = stat['base_stat'];
                      break;
                    case 'speed':
                      speed = stat['base_stat'];
                      break;
                    case 'special-attack':
                      specialAttack = stat['base_stat'];
                      break;
                    case 'special-defense':
                      specialDefense = stat['base_stat'];
                      break;
                    default:
                      stat = 'Stat not available';
                  }
                setStats({hp: hp, attack: attack, defense: defense, speed: speed, specialAttack: specialAttack, specialDefense: specialDefense});
                })
          }
      </>
      );
    }

async function getPokemonEvolutions() {
  // #Species url for evolutions -- Regular Pokemon index !== evolution index
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;
  const getPokemonSpecies = await axios.get(pokemonSpeciesUrl);
  const pokemonSpeciesRes = getPokemonSpecies.data;

  // #Evolution id -- Regular Pokemon index !== evolution index
  const evolutionChainUrl = pokemonSpeciesRes['evolution_chain'].url;
  const evolutionChainUrlSections = evolutionChainUrl
  .split('/')  
  .map((section) => {
  return section;
  }
  );
  const pokeEvolutionIndex = parseInt(evolutionChainUrlSections[(evolutionChainUrlSections.length - 2)]);


  // #Get Pokemon Evolution data
  const pokemonUrlEvolution = `https://pokeapi.co/api/v2/evolution-chain/${pokeEvolutionIndex}`;
  const getPokemonEvols = await axios.get(pokemonUrlEvolution);
  const pokemonResEvolution = getPokemonEvols.data;

  const evol1 = pokemonResEvolution.chain.species.name;
  let evol2 = pokemonResEvolution.chain['evolves_to'][0];
  let evol3 = pokemonResEvolution.chain['evolves_to'][0];

  if(evol2 === undefined) {
    evol2 = '';
    evol3 = '';
    console.log("No further evolutions");
    } else if (evol3['evolves_to'][0] === undefined){
    evol2 = pokemonResEvolution.chain['evolves_to'][0].species.name;
    evol3 = '';
    console.log(`Just 1 available evolution ${evol2}`);
    } else {
    evol2 = pokemonResEvolution.chain['evolves_to'][0].species.name;
    evol3 = pokemonResEvolution.chain['evolves_to'][0]['evolves_to'][0].species.name;
    console.log(`2 available evolutions ${evol2} ${evol3}`)};
  
  // Set evolution data  
  setEvol1(evol1);
  setEvol2(evol2);
  setEvol3(evol3);
}

useEffect( () => {
  getPokemonInfo();
  getPokemonEvolutions();
  //eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    return (
      <>
      <div className="col">
        <div className="card" style={{minHeight: '55vh'}}>
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>#{pokemonIndex}</h5>
              </div>
            <div className="col-7">
              <div className="float-right">
                {types.map(type => (
                  <span
                    key={type}
                    className="badge badge-primary badge-pill mr-1"
                    style={{
                    backgroundColor: `#${TYPE_COLORS[type]}`,
                    color: 'white',
                    fontSize: '16px',
                    }}
                    >
                    {type
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}
                  </span>
                ))}
                </div>
              </div> 
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                {imageUrl ? (<img src={imageUrl} className="card-img-top rounded mx-auto ml-2 d-block" style={{width: '120px'}} alt="poke-img"/>) : (<img src={spinner} style={{width: '5em', height: '5em'}} className="card-img-top rounder mx-auto d-block mt-2" alt="loader"/>)}
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {window.name
                  .toLowerCase()
                  .split('-')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
                </h4>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    HP
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${stats.hp}%`
                      }}>
                        <small>{stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row alignt-items-center">
                  <div className="col-12 col-md-3">
                    Attack
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                       style={{
                        width: `${stats.attack}%`
                      }}
                      >
                        <small>{stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Defense
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${stats.defense}%`
                      }}
                      >
                        <small>{stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Speed
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${stats.speed}%`
                      }}
                      >
                        <small>{stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Special attack
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${stats.specialAttack}%`
                      }}>
                        <small>{stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Special Defense
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${stats.specialDefense}%`
                      }}>
                        <small>{stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
              </div>
              <div className="col-md-9" style={{marginTop: '20px'}}>
                <h4 className="mx-auto">
                  Profile
                </h4>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Abilities:
                  </div>
                  <div className="col-23 col-md-9">
                    <h6> {abilities}</h6>
                  </div>
                  <div className="col-12 col-md-3">
                    Moves:
                  </div>
                  <div className="col-23 col-md-9">
                  <h6 className="float-left">{moves.map(move => {
                      return move.toLowerCase().split('-')
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ');
                    }).join(', ')
                }</h6>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="col" style={{minHeight: '35vh'}}>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-12">
                <h5>EVOLUTIONS</h5>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-sm text-center">
                <img src={`${evol1 ? "https://img.pokemondb.net/sprites/home/normal/" + evol1 + ".png": ' '}`} alt=""/>
                  <h5>{evol1
                  .toLowerCase()
                  .split('-')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')
                    }</h5>
                </div>
                <div className="col-sm text-center">
                  <img src={`${evol2 ? "https://img.pokemondb.net/sprites/home/normal/" + evol2 + ".png": ' '}`} alt=""/>
                  <h5>{evol2
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')
                    }</h5>
                </div>
                <div className="col-sm text-center">
                <img src={`${evol3 ? "https://img.pokemondb.net/sprites/home/normal/" + evol3 + ".png" : ' '}`} alt=""/>
                  <h5>{evol3
                                    .toLowerCase()
                                    .split(' ')
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')
                    }</h5>
                </div>
              </div>
            </div>
          </div>
      </div>
      </>
      )
  }

  export default Pokemon;