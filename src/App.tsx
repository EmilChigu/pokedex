import React, { useState } from "react";
import axios from "axios";
import SinglePokemon from "./components/SinglePokemon";
import PokemonNotFound from "./components/PokemonNotFound";
import Nav from "./components/ui/Nav";

// Interface for pokemon state object
interface IPokemon {
  name: string;
  height: number;
  weight: number;
  species: { name: string; url: string };
  sprites: { front_default: string };
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  game_indices: number;
}

function App() {
  // Name of the pokemon being searched for
  const [name, setName] = useState<string>("");
  // data for the pokemon that is found.
  const [pokemon, setPokemon] = useState<IPokemon>();
  // setting an error state if a pokemon is not found / API returns error
  const [notFound, setNotFound] = useState<boolean>(false);
  // Setting a loading state whilst waiting for async await
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pokemonName = event.target.value;
    // API is case sensitive, all URL params must be lowercase
    setName(pokemonName.toLocaleLowerCase());
  };

  // Submitting the form to search for the pokemon
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Setting app to a default state before looking for a pokemon
    setLoading(true);
    setNotFound(false);
    setPokemon(undefined);
    event.preventDefault();

    try {
      const foundPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      // Setting the pokemon state object to the API response
      setPokemon({
        name: foundPokemon.data.name,
        height: foundPokemon.data.height,
        weight: foundPokemon.data.weight,
        species: foundPokemon.data.species,
        sprites: foundPokemon.data.sprites,
        stats: foundPokemon.data.stats,
        game_indices: foundPokemon.data.game_indices.length,
      });

      // CLearing form input and stopping loading state
      setName("");
      setNotFound(false);
      setLoading(false);
    } catch (error: any) {
      // Logging errors if they are found
      console.log(error.response.data);
      setNotFound(true);
      setPokemon(undefined);
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" space-y-5 h-screen flex flex-col bg-[#D3D3D3] items-center">
        <Nav />
        <form
          onSubmit={handleSubmit}
          className=" space-x-3 flex justify-center w-1/2"
        >
          <input
            className="w-full"
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder="Search for a pokemon to start"
          />
          {/* Button disabled if input field is empty */}
          <button
            type="submit"
            disabled={name.length <= 0}
            className=" shadow-sm p-2 border border-black rounded-lg bg-[#000] text-[#fff] font-semibold hover:bg-[#fff] hover:text-red hover:border-red"
          >
            Search
          </button>
        </form>
        {/* IF applications is in loading state, show a loading message */}
        {loading && (
          <>
            <img
              src="https://thumbs.gfycat.com/DefenselessPoisedArizonaalligatorlizard-max-1mb.gif"
              alt=""
            />
            <h1 className="text-3xl font-semibold">
              Trying to catch it<span className="animate-ping">...</span>
            </h1>
          </>
        )}
        {/* If there is an error with the API, render the error page */}
        {notFound && <PokemonNotFound />}
        {/* Render the pokemon page if one is found */}
        {pokemon && <SinglePokemon {...pokemon} />}
      </div>
    </>
  );
}

export default App;
