import {useState, useEffect} from 'react';
import axios from 'axios';

import logo from '../../unnamed.png';
// import PokemonCard from '../pokemon/PokemonCard';


function NavBar() {
  const [draft, setDraft] = useState([]); // with draft we keep control of the information the user types before submitting it. 
  const [search, setSearch] = useState([]); 
  const [pokemonNames, setPokemonNames] = useState([]);

  function handleChange(e) {
    const newDraft = [e.target.value.substr(0, 20).toLowerCase()];
    setDraft(newDraft);
  }

  function handleClick(e) {
    const newSearch = [draft]; //Here we make a copy of what has been written. If you want to keep track of all searches use '...search'
    setDraft([]); // Here we set the draft to starter point
    setSearch(newSearch); // Here is where we set the information in search
    e.preventDefault();
  }

  function filteredPokemon() {
    const actualSearch = search[0];
    
    if(Object.values(pokemonNames).indexOf(`${actualSearch}`) > -1) {
      console.log(`${actualSearch} is a pokemon`);
    } else if(actualSearch === undefined) {
      console.log("First search hasn't been made")
    } else {
      console.log(`Sorry, ${actualSearch} is not a pokemon`)
    }
    };


  async function getPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';
    const res = await axios.get(url);
    const pokemons = res.data['results'];
    return(
      <>
      {setPokemonNames(pokemons.map((pokemon) => pokemon.name))}
      {filteredPokemon()}
      </>
    );
  }


  useEffect(() => {
    getPokemon();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // If you cannot find the value of search within the particular name then do not return it. However when you can find it, so when it is not equal to -1 (means it can't find it) go ahead and return the value. 

  // let filteredPokemon = pokemonNames ? (pokemonNames.filter(
  //   (name) => 
  //   {
  //     return name.toLowerCase().indexOf(search) !== -1;
  //   }
  // )) : '';


    return (
      <div>
        <div className="App">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed top">
              <div className="container">
                <a href="/" className="navbar-brand col-sm-3 col-md-2 mr-0">
                <img src={logo} className="App-logo" alt="logo" />
              </a>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search by name" aria-label="Search"
                  onChange={handleChange}
                  value={draft}/>
                  <button onClick={handleClick} className="btn btn-info my-2 my-sm-0 search-btn" type="submit"><i className="fas fa-search"></i></button>
                </form>
              </div>
              </div>
            </nav>
        </div>
      </div>
    )
}

export default NavBar;
