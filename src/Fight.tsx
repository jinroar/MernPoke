import { useEffect, useState } from "react";
import PinkButton from "./components/PinkButton";
import { Pokemon } from "./interfaces/Pokemon";
import { Moves } from "./interfaces/Moves";
import AudioPlayer from "react-audio-player"
import './index.css';
import { useLocation } from 'react-router-dom';
import defaultGif from './assets/mysunshine.gif';
import { Progress } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";


const memapower = "😭";

import { PokemonList } from "./interfaces/PokemonList";
import { Link } from "react-router-dom";
import axios from "axios";
import { response } from "express";


const Fight = () => {



  const location = useLocation();
  const { pokemon1, pokemon2 } = location.state;

  const [pokemon1Data, setPOkemon1Data] = useState<Pokemon | null>(null);
  const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);

  const [move1, setMove1] = useState<Moves | null>(null);
  // const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);
  // const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);
  // const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);


  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);

  useEffect(() => {
    listPokemon();
  }, [])

  const listPokemon = async () => {
    const fetchJson = await fetch("http://localhost:8080/api/pokemon/list");
    const listData = await fetchJson.json();
    setPokemonList(listData);
  }

  const [hasFightResults, setHasFightResults] = useState<boolean>(false);
  const [pkmn1Hp, setPkmn1Hp] = useState(0);
  const [pkmn2Hp, setPkmn2Hp] = useState(0);

  const [capture, setCapture] = useState<boolean>(false);

  const defaultHp1 = pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0 ;
  const defaultHp2 = pokemon2Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0 ;


  function getRandomElFromArray(arrayLenght) {
    return Math.floor(Math.random() * arrayLenght);
  }

  const showMove = async (pokemon: typeof pokemon2Data) => {

    const move = pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.name
    const moveURL = pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url

    const fetchJson = await fetch(`${moveURL}`);
    const dmg = await fetchJson.json();

    console.log(move);
    console.log(dmg.power);


    setMove1(dmg)
    return dmg.power;

  };



  const selected = async () => {

    const fetchJson1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`);
    const pokemonData1 = await fetchJson1.json();
    setPOkemon1Data(pokemonData1);
    setPkmn1Hp(pokemon1Data?.stats[0].base_stat || 0);

    const fetchJson2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`);
    const pokemonData2 = await fetchJson2.json();
    setPOkemon2Data(pokemonData2);
    setPkmn2Hp(pokemon2Data?.stats[0].base_stat || 0);

  }

const hule = async (pokemon1Data: Pokemon | null) => {
  const url = `http://localhost:8080/api/pokemon/store`

  const capturedPokemon = {
    name: pokemon1Data?.name
  }

  await axios.post(url, capturedPokemon)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
    
}


  const [showHideButton, setShowHideButton] = useState(false);

  const handleClick = () => {
    setShowHideButton(true);
  };

  const payt = (move, target) => {

    if (pkmn1Hp <= 0) {
      setPkmn1Hp(0);
      addItem(pokemon1Data?.name + " Fainted!!");


       //add capture / end of game 
      hule(pokemon1Data);

     

      setCapture(true);

    } else {

      if (target === 1) {
        const deduct1 = (pkmn1Hp - (move?.power || 0));
        console.log(pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0);

        console.log(move?.power || 0);
        console.log(deduct1);

        addItem(pokemon2Data?.name + " used " + move?.name + " current hp: " + deduct1);

        setPkmn1Hp(deduct1);
       
      }

    }
    if (pkmn2Hp <= 0) {
      setPkmn2Hp(0);

      //add capture / end of game

    } else {

      if (target === 2) {
        const deduct2 = (pkmn2Hp - (move?.power || 0));
        console.log(pokemon2Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0);

        console.log(move?.power || 0);
        console.log(deduct2);

        setPkmn1Hp(deduct2);

      }
    }
    setHasFightResults(true);



  }

  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);

  };

  return (
    <div className="bg-[url('https://wallpaperaccess.com/full/8406757.gif')]   
        text-poke-yellow">
      <button>   <Link to="/About">Back to Menu</Link> </button><br></br><br></br>

      <div className=" grid-rows-4">

        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <div>01

          <>
                <strong className="fight"> 🔥 {pokemon1Data?.name.toUpperCase()}: {pkmn1Hp} 🔥</strong>   <br></br>
                <strong className="fight"> 🔥 vs 🔥</strong> <br></br>
                <strong className="fight"> 🔥 {pokemon2Data?.name.toUpperCase()}: {pkmn2Hp} 🔥</strong> <br></br>

                <ul>
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              </>
            
              {
            capture && (
              <>
                <strong className="fight"> 🔥  {pokemon1Data?.name.toUpperCase()}  Current HP: {pkmn1Hp} 🔥</strong>   <br></br>
               <strong className="fight"> 🏀🎱⚾🏐⚽ THROW POKEBOL ??????? 🏀🎱⚾🏐⚽</strong> <br></br>
              
                <strong className="fight"> 🔥 Capture Rate ??????? {(100-(50*(pkmn1Hp/defaultHp1)))} 🔥</strong> <br></br>
                <img className="size-50" alt="https://media1.tenor.com/m/gnZcXcBonfUAAAAC/you-are-my-sunshine-lebron.gif" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTE0OWRheXo4dDVqOXgydDdnNDRiZHBlY3VpMGZjbTN3Z2tqcGgxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7OzAnGdw9bWTH5iroJ/giphy.gif" />


              </>
            )
          }

          </div>

          <div>02
            {
              pokemon2Data &&
              <div className="border-poke-yellow border-spacing-2 border-4 grid place-content-start md:place-content-start ">
                <img className="size-full" alt="https://media1.tenor.com/m/gnZcXcBonfUAAAAC/you-are-my-sunshine-lebron.gif" src={pokemon2Data.sprites.other.showdown.back_default || defaultGif} />

                <p>
                  Name: {pokemon2Data?.name.toUpperCase()} <br />
                  <span className=" bg-gray-200 h-4 rounded w-full animate-pulse text-gray-600">HP: {pkmn2Hp}%</span> <br />
                  HP: {pokemon2Data.stats.find(e => e.stat.name === "hp")?.base_stat} <br />

                  Attack: {pokemon2Data.stats.find(e => e.stat.name === "attack")?.base_stat} <br />
                  Defense: {pokemon2Data.stats.find(e => e.stat.name === "defense")?.base_stat} <br /><br />
                  <AudioPlayer src={pokemon2Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')} />

                </p>

              </div>


            }

          </div>

          <div className="grid grid-rows-subgrid gap-4 row-span-3">


            <div className="row-start-2">03
              {
                move1 &&
                <div className="bg-transparent p-8 rounded-lg
                        border-2 border-white shadow-lg  
                        " onClick={() => payt(move1, 1)}>
                  <h1 className="text-3xl font-bold mb-4">
                    {move1.name}

                  </h1>
                  <p className="text-lg">
                    Damage:  {move1.power || memapower}
                  </p>

                </div>
              }

              <div className="bg-transparent p-8 rounded-lg
                        border-2 border-white shadow-lg  ">
                <h1 className="text-3xl font-bold mb-4">
                  Moves
                </h1>
                <p className="text-lg">
                  Choose wisely 😎😎😎
                </p>


              </div>

            </div>
            <div className="row-start-2">
              <div>04
                <div className="bg-transparent p-8 rounded-lg
                        border-2 border-white shadow-lg  ">
                  <h1 className="text-3xl font-bold mb-4">
                    Moves
                  </h1>
                  <p className="text-lg">
                    Choose wisely 😎😎😎
                  </p>
                </div>

                <div className="bg-transparent p-8 rounded-lg
                        border-2 border-white shadow-lg  ">
                  <h1 className="text-3xl font-bold mb-4">
                    Moves
                  </h1>
                  <p className="text-lg">
                    Choose wisely 😎😎😎
                  </p>
                </div>

              </div>
            </div>
          </div>


          <div>05</div>

          <div>06       {
            pokemon1Data &&
            <div className="border-poke-yellow border-spacing-2 border-4  grid place-content-start md:place-content-end ">

              <img className="size-44" src={pokemon1Data.sprites.other.showdown.front_default || defaultGif} />

              <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div className="h-1 bg-primary" style={{ width: `45%` }}></div>
              </div>

              <p>
                Name: {pokemon1Data?.name.toUpperCase()} <br />
                <span className=" bg-gray-200 h-4 rounded w-full animate-pulse text-gray-600">HP: {pkmn1Hp}%</span> <br />
                HP: {pokemon1Data.stats.find(e => e.stat.name === "hp")?.base_stat} <br />
                Attack: {pokemon1Data.stats.find(e => e.stat.name === "attack")?.base_stat} <br />
                Defense: {pokemon1Data.stats.find(e => e.stat.name === "defense")?.base_stat}  <br /><br />
                <AudioPlayer src={pokemon1Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')} />
              </p>


            </div>

          }</div>
        </div>


      </div>



      {showHideButton ? (
        <div >
          <PinkButton buttonClick={() => { selected(); }} label="💥FIGHT💥" /><br />
        </div>
      ) : null}


      <div className="box5">

        <div className="fight">
          {
            hasFightResults && (
              <>
                <strong className="fight"> 🔥 {pokemon1Data?.name.toUpperCase()}: {pkmn1Hp} 🔥</strong>   <br></br>
                <strong className="fight"> 🔥 vs 🔥</strong> <br></br>
                <strong className="fight"> 🔥 {pokemon2Data?.name.toUpperCase()}: {pkmn2Hp} 🔥</strong> <br></br>
              </>
            )
          }
        </div>


        <div className="my-8 text-center border-poke-yellow border-spacing-2 border-4">

          <button className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded" onClick={() => { selected(); handleClick(); showMove(pokemon2Data); }}>FIGHT?</button>

        </div>


        <div className="hide">Pokemon 1: {pokemon1}</div>
        <div className="hide">Pokemon 2: {pokemon2} </div>



      </div>


    </div>

  )
}

export default Fight;