import React from "react";

function PokemonNotFound() {
  return (
    <div className="w-1/2 bg-[#fff]  p-3 rounded-lg shadow-lg">
      <div className="flex justify-center">
        <img
          src="https://freepngimg.com/thumb/pokemon/109859-ketchum-ash-free-download-png-hd.png"
          alt="sad pokemon"
          width="200px"
        />
      </div>
      <h1 className="p-2 text-center font-semibold text-xl">
        The pokemon you were looking for was not found.
      </h1>
      <p className="text-center">
        Maybe you made a spelling mistake, please try again.
      </p>
    </div>
  );
}

export default PokemonNotFound;
