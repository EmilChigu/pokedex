import React from "react";

interface IPokemon {
  name: string;
  height: number;
  weight: number;
  species: { name: string; url: string };
  sprites: { front_default: string };
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  game_indices: number;
}

function SinglePokemon({
  name,
  height,
  species,
  sprites,
  stats,
  weight,
  game_indices,
}: IPokemon) {
  return (
    <>
      <div className="bg-[#fff] p-4 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-center">
          <img
            className=""
            src={sprites.front_default}
            alt={`Sprite of ${name}`}
          />
        </div>
        <h1 className="font-bold text-3xl text-center">{name}</h1>
        <div className="flex justify-between my-3">
          <div>
            <p>
              <span className="font-semibold">Species</span>: {species.name}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Featured in</span>: {game_indices}{" "}
              games
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] p-4 rounded-lg shadow-lg w-1/2">
        <h5 className="text-center text-xl font-semibold mb-2 underline mt-3">
          Measurements
        </h5>

        <div className="flex justify-between ">
          <p>
            <span className="font-semibold">Height</span>: {height}
          </p>
          <p>
            <span className="font-semibold">Weight</span>: {weight}
          </p>
        </div>
      </div>

      <div className="bg-[#fff] p-4 rounded-lg shadow-lg w-1/2">
        <div className="w-full mt-3">
          <h5 className="text-center text-xl font-semibold mb-2 underline">
            Base stats
          </h5>

          <div className="">
            {stats.map((stat) => (
              <div className="">
                <p>
                  <span className="font-semibold">{stat.stat.name}</span>:{" "}
                  {stat.base_stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePokemon;
