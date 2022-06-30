import React, { useState } from "react";
import axios from "axios";
import SinglePokemon from "./components/SinglePokemon";
import PokemonNotFound from "./components/PokemonNotFound";
import Nav from "./components/ui/Nav";

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
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pokemonName = event.target.value;
    setName(pokemonName.toLocaleLowerCase());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setNotFound(false);
    setPokemon(undefined);
    event.preventDefault();

    try {
      const foundPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      console.log(foundPokemon);

      setPokemon({
        name: foundPokemon.data.name,
        height: foundPokemon.data.height,
        weight: foundPokemon.data.weight,
        species: foundPokemon.data.species,
        sprites: foundPokemon.data.sprites,
        stats: foundPokemon.data.stats,
        game_indices: foundPokemon.data.game_indices.length,
      });

      setName("");
      setNotFound(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
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

          <button
            type="submit"
            disabled={name.length <= 0}
            className=" shadow-sm p-2 border border-black rounded-lg bg-[#000] text-[#fff] font-semibold hover:bg-[#fff] hover:text-red hover:border-red"
          >
            Search
          </button>
        </form>
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
        {notFound && <PokemonNotFound />}
        {pokemon && <SinglePokemon {...pokemon} />}
      </div>
    </>
  );
}

export default App;
