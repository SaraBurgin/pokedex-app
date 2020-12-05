## Project description:

### Building the interface:

- React

## Requesting the data:

- I have used axios library to make the HTTP request to the Pokemon API with axios get and used state to set the data.

## Styling

- As for styling I have included both Bootstrap and Styled-components to my project. Using them, in some cases, together to achieve what I wanted.

## Testing

- As for testing I have used jest which comes as default with create-react-app and enzyme.

### Available unit tests:

- App.test.js
  Render without crashing & render navbar.

- Pokemon.test.js
  Renders pokemon without crashing

- PokemonCard.test.js
  Renders pokemonCard without crashing using render from react library and MemoryRouter
  Again, renders PokemonCard correctly but this time using enzyme

- PokemonList.test.js
  Renders pokemonList without crashing using react library
  Renders load more button correctly
  Renders the text inside the button correctly using Jes
  Matches snapshot is correctly working using jest and renderer from react-test-renderer

In the project directory, you can run:

### `yarn test`

Launches the test runner in the interactive watch mode.\

## Task description:

This task requires using the PokeAPI (https:// pokeapi.co/) to create a Pokedex of all existing Pokemon. The App should lis all Pokemon and offer the possibility to view details.

The details page should display:

- picture
- name
- abilities
- type
- order-number
- stats
- possible evolutions
- moves

### Technical constraints:

- Javascript Framework: Angular, React or Vue
- style Framework: any (e.g. Bootstrap or Material), but mandatory
- TypeScript
- PokeAPI: https://pokeapi.co
- A minimum of 3 meaningul Unit Tests
