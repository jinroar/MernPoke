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
  const [move2, setMove2] = useState<Moves | null>(null);
  const [move3, setMove3] = useState<Moves | null>(null);
  const [move4, setMove4] = useState<Moves | null>(null);

  const [result, setResult] = useState<string | null>(null);

  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);



  const listPokemon = async () => {
    const fetchJson = await fetch("http://localhost:8080/api/pokemon/list");
    const listData = await fetchJson.json();
    setPokemonList(listData);
  }

  const [hasFightResults, setHasFightResults] = useState<boolean>(false);
  const [pkmn1Hp, setPkmn1Hp] = useState(0);
  const [pkmn2Hp, setPkmn2Hp] = useState(0);

  const [capture, setCapture] = useState<boolean>(false);
  const [stored, setStored] = useState<boolean>(false);

  const defaultHp1 = pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;
  const defaultHp2 = pokemon2Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;


  function getRandomElFromArray(arrayLenght) {
    return Math.floor(Math.random() * arrayLenght);
  }

  const showMove = async (pokemon: typeof pokemon2Data) => {

    const move1 = pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url
    const data1 = await fetch(`${move1}`);
    const show1 = await data1.json();

    const move2 = pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url
    const data2 = await fetch(`${move2}`);
    const show2 = await data2.json();

    const move3 = pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url
    const data3 = await fetch(`${move3}`);
    const show3 = await data3.json();

    const move4 = pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url
    const data4 = await fetch(`${move4}`);
    const show4 = await data4.json();

    setMove1(show1);
    setMove2(show2);
    setMove3(show3);
    setMove4(show4);
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


    const calculateProbability = async () => {
      const probability = (100 - (50 * (pkmn1Hp / defaultHp1)));
      const randomValue = Math.random();


      if (randomValue < probability) {
        setResult('Captured!! YIPPIEE 🎉🎉');

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

        setStored(true);

      } else {
        setResult('Escaped!!');
      }
    };

    calculateProbability();




  }


  const [showHideButton, setShowHideButton] = useState(false);

  const handleClick = () => {
    setShowHideButton(true);
  };

const enemy = async (pokemon: typeof pokemon2Data)  => {

  const move1 = pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url
  const data1 = await fetch(`${move1}`);
  const move = await data1.json();

  if (pkmn2Hp <= 0) {
    setPkmn2Hp(0);
    
    //add capture / end of game

  } else {
   
    const deduct = (pkmn2Hp - (move?.power || 0));
    console.log(pokemon2Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0);

    console.log(move?.power || 0);
    console.log(deduct);

    addItem("--------------------------------------------------------------------");
    addItem(pokemon1Data?.name + " used " + move?.name.toUpperCase + " with a power of "+  (move?.power||0));
    addItem(pokemon2Data?.name + " remaining HP: " +deduct);

    setPkmn2Hp(deduct);

  }

}

  const payt = (move, target) => {

    setCapture(true);

    if (0 >= pkmn1Hp) {
      setPkmn1Hp(0);
      addItem(pokemon1Data?.name + " Fainted!!");


    } else {

      if (target === 1) {
        const deduct = (pkmn1Hp - (move?.power || 0));
        console.log(pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0);

        console.log(move?.power || 0);
        console.log(deduct);
///bacc
        addItem("--------------------------------------------------------------------");
        addItem(`pokemon2Data?.name + " used " + (move?.name.toUpperCase()  + " with a power of "+  (move?.power||0)`);
        addItem(pokemon1Data?.name + " remaining HP: " +deduct);

        setPkmn1Hp(deduct);
        enemy(pokemon1Data);
      }

    }

  }

  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);

  };

  useEffect(() => {
    listPokemon();
    selected();

  }, [])

  return (
    <div className="  overflow-hidden  bg-[url('https://wallpaperaccess.com/full/8406757.gif')]   
        text-poke-yellow">
      <button>   <Link to="/About">Back to Menu</Link> </button><br></br><br></br>

      <div className=" grid-rows-4">

        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <div>01
            <button className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded" onMouseEnter={handleClick} onClick={() => { showMove(pokemon2Data) }}>
              Generate Move Set</button>
            <button className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded" onClick={() => { selected() }}>
              ▶</button>

            <>


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

                  <strong className="fight"> 🔥 Capture Rate ??????? {(100 - (50 * (pkmn1Hp / defaultHp1)))}% 🔥</strong> <br></br>
                  {showHideButton ? (
                    <div >
                      <PinkButton buttonClick={() => { hule(pokemon1Data); }} label="💥CAPTURE???💥" /><br />
                    </div>
                  ) : null}
                  <img className="size-50" alt="https://media1.tenor.com/m/gnZcXcBonfUAAAAC/you-are-my-sunshine-lebron.gif" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTE0OWRheXo4dDVqOXgydDdnNDRiZHBlY3VpMGZjbTN3Z2tqcGgxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7OzAnGdw9bWTH5iroJ/giphy.gif" />

                </>
              )
            }
            {
              stored && (
                <>
                  {result && <p>{result}</p>}


                  <div>
                    <button className=" h-20 w-70 top-40    hover:border-poke-yellow border-spacing-2 border-4 ..."><Link to="/Stored"> Stored Pokemon </Link></button>
                  </div>
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
              {
                move2 &&
                <div className="bg-transparent p-8 rounded-lg
                        border-2 border-white shadow-lg  
                        " onClick={() => payt(move2, 1)}>
                  <h1 className="text-3xl font-bold mb-4">
                    {move2.name}

                  </h1>
                  <p className="text-lg">
                    Damage:  {move2.power || memapower}
                  </p>

                </div>
              }

            </div>
            <div className="row-start-2">
              <div>04
                {
                  move3 &&
                  <div className="bg-transparent p-8 rounded-lg
                        border-2 border-white shadow-lg  
                        " onClick={() => payt(move3, 1)}>
                    <h1 className="text-3xl font-bold mb-4">
                      {move3.name}

                    </h1>
                    <p className="text-lg">
                      Damage:  {move3.power || memapower}
                    </p>

                  </div>
                }
                {
                  move4 &&
                  <div className="bg-transparent p-8 rounded-lg
                        border-2 border-white shadow-lg  
                        " onClick={() => payt(move4, 1)}>
                    <h1 className="text-3xl font-bold mb-4">
                      {move4.name}

                    </h1>
                    <p className="text-lg">
                      Damage:  {move4.power || memapower}
                    </p>

                  </div>
                }

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


        <div className="hide">Pokemon 1: {pokemon1}</div>
        <div className="hide">Pokemon 2: {pokemon2} </div>



      </div>


    </div>

  )
}

export default Fight;