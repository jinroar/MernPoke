//Stored.js

import axios from "axios";
import React, { useState, useEffect } from "react";
//import { PokemonList } from "../interfaces/PokemonList";
import { Link } from "react-router-dom";

const url = `http://localhost:8080/api/pokemon/store`;

const capturedPokemon = {
  name: String,
};

const poke = "pikachu";

const Stored = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // fetch("http://localhost:8080/api/pokemon/owned")
      //   .then((response) => response.json())
      //   .then((data) => setEmployees(data));

      fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
        .then((response) => response.json())
        .then((data) => setEmployees(data));
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="Stored">
      <button>
        {" "}
        <Link to="/Menu">Back to Menu</Link>{" "}
      </button>
      <h1>Captured Pokemon</h1> <br></br>
      {/* <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            Id: {employee.id} <br></br>
            Name: {employee.name}
            <br></br>
          </li>
        ))}
      </ul> */}
      <ul>
        <Link to="/Capture" state={poke}>
          <li>
            <img
              src="https://www.clipartmax.com/png/middle/129-1298464_open-pokeball-download-open-pokeball.png"
              alt="Beautiful Landscape"
              className=" centeerw-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
            />
            <img
              src="https://www.clipartmax.com/png/middle/129-1298464_open-pokeball-download-open-pokeball.png"
              alt="Serene Nature"
              className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
            />
            Pikachu<br></br>
          </li>
        </Link>

        <li>
          Mema
          <br></br>
        </li>
      </ul>
    </div>
  );
};

export default Stored;
