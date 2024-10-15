//Stored.js 

import axios from 'axios';
import React, { useState, useEffect } from 'react';
//import { PokemonList } from "../interfaces/PokemonList";
import { Link } from "react-router-dom";

const url = `http://localhost:8080/api/pokemon/store`

const capturedPokemon = {
  name: String
}




const Stored = () => {


  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {

      fetch('http://localhost:8080/api/pokemon/owned')
        .then(response => response.json())
        .then(data => setEmployees(data));
    }

    fetchPokemonData();
  }, []);



  return (

    <div className="Stored">
      <button>   <Link to="/Menu">Back to Menu</Link> </button><br></br><br></br>

      <h1>Captured Pokemon</h1> <br></br>

      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            Id: {employee.id} <br></br>
            Name: {employee.name}<br></br>
          
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Stored;
