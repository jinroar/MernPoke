import { useEffect, useState } from "react";
import PinkButton from "./components/PinkButton";
import { Pokemon } from "./interfaces/Pokemon";
import AudioPlayer from "react-audio-player";
import "./index.css";
import { useLocation } from "react-router-dom";
import searchbak from "./assets/mysunshine.gif";
import { PokemonList } from "./interfaces/PokemonList";
import { Link } from "react-router-dom";
import defaultGif from "./assets/mysunshine.gif";

const SearchPokemon = () => {
  const location = useLocation();
  const pokemon1 = location.state;

  console.log(pokemon1);

  const [pokemon1Data, setPOkemon1Data] = useState<Pokemon | null>(null);

  const randomClick = () => {
    for (let i = 0; i < 60; i++) {
      selected();
    }
  };

  const selectPokemon = async (pokemon: unknown) => {
    //Add Insert To Express

    const fetchJson1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const pokemonData1 = await fetchJson1.json();

    setPOkemon1Data(pokemonData1);
  };

  const [hasFightResults] = useState<boolean>(false);
  const [pkmn1Hp] = useState(0);

  const selected = async () => {
    for (let i = 1; i < 3; i++) {
      const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const num1 = randomNumberInRange(0, 1301);

      const fetchJson1 = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${num1}`
      );
      const pokemonData1 = await fetchJson1.json();
      setPOkemon1Data(pokemonData1);
    }
  };

  const [showHideButton] = useState(false);

  return (
    <div
      className="  overflow-hidden bg-no-repeat bg-cover bg-[url('https://imgs.search.brave.com/rgmlx28x7YV5WVPpvAcEPATc5ZSywCb2B9eQlQc-RLA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ2Lzlm/L2ZkLzQ2OWZmZGYy/OTA4NmYxZjMwYjZm/NTkyZDRlMGRkZTg1/LmdpZg.gif')] 
    max-w-screen w-screen h-screen max-h-screen  grid-cols-4 content-center ...
        text-poke-yellow"
    >
      <button className="relative inset-y-0  w-70 h-10  text-center  border-poke-yellow border-spacing-2 border-4">
        <Link to="/About">Back to Menu</Link>{" "}
      </button>

      <div className="relative -inset-y-10 inset-x-60    my-8 h-56 grid grid-cols-4 row-auto gap-4 content-center ...">
        <Link
          to="/Fight"
          state={{ pokemon1: pokemon1, pokemon2: pokemon1Data?.name }}
        >
          {pokemon1Data && (
            <div
              className="border-poke-yellow border-spacing-2 border-4 bg-grey-glass bg-opacity-20 hover:bg-tahiti/25 content-center"
              onClick={() => selectPokemon(pokemon1Data.name)}
            >
              <div className="relative group conte">
                <div className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded">
                  {pokemon1Data?.name.toUpperCase()}
                </div>

                <img
                  src={
                    pokemon1Data.sprites.other.showdown.front_default ||
                    defaultGif
                  }
                  alt="Beautiful Landscape"
                  className=" centeerw-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                />
                <img
                  src={
                    pokemon1Data.sprites.other.showdown.back_default ||
                    defaultGif
                  }
                  alt="Serene Nature"
                  className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />

                <p>
                  Name: {pokemon1Data?.name.toUpperCase()} <br />
                  HP:{" "}
                  {
                    pokemon1Data.stats.find((e) => e.stat.name === "hp")
                      ?.base_stat
                  }{" "}
                  <br />
                  Attack:{" "}
                  {
                    pokemon1Data.stats.find((e) => e.stat.name === "attack")
                      ?.base_stat
                  }{" "}
                  <br />
                  Defense:{" "}
                  {
                    pokemon1Data.stats.find((e) => e.stat.name === "defense")
                      ?.base_stat
                  }{" "}
                  <br />
                  <br />
                  <AudioPlayer
                    src={pokemon1Data.cries.latest}
                    controls
                    volume={0.5}
                    onPlay={() => console.log("Playing")}
                    onPause={() => console.log("Paused")}
                  />
                </p>
              </div>
            </div>
          )}
        </Link>
      </div>

      <div className="relative inset-y-20   my-8 text-center border-poke-yellow border-spacing-2 border-4">
        <button
          className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded"
          onMouseEnter={randomClick}
        >
          {pokemon1}
        </button>
      </div>
    </div>
  );
};

export default SearchPokemon;
