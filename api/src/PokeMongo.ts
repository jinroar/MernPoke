import mongoose from 'mongoose';

const { Schema } = mongoose;

const pokemonSchema = new Schema({

  name: String,

  
}, { versionKey: false });
  
const capturedPokemonModel = mongoose.model(
  "caputuredPokemon",
  pokemonSchema,
  "captured_pokemon"
)

export default capturedPokemonModel;

// type: String ,
// hp: Number,
// attack: Number

// function PokemonData(pid: number, pokemonData: { name: string; type: string; hp: number; attack: number; }){

//   const Schema = mongoose.Schema;
  
//   const PokemonSchema = new Schema({

//     id: { type: Number },
//     name: String,
//     type: { type: String },
//     hp: Number,
//     attack: Number
    
//   },{ versionKey: false });
  
//   const Pokemon = mongoose.model('Pokemon', PokemonSchema);

// // Function call 
// Pokemon.create([
//   { id: pid, 
//     name: pokemonData.name, 
//     type: pokemonData.type, 
//     hp: pokemonData.hp, 
//     attack: pokemonData.attack, }
// ]).then(function () {
//   console.log("Data inserted") // Success 
// }).catch(function (error) {
//   console.log(error)     // Failure 
// }); 

// }


// export default PokemonData;