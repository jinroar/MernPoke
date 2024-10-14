import express, { Request, Response} from 'express';
import { config } from 'dotenv';
import connectToDB from './mongo';
const app = express();
config();

const port = process.env.ALT_PORT || "3015";


app.get("/list", async (req: Request, res: Response) => {
  const db = await connectToDB(process.env.uri || "");
  try {
    if (db) {
      const testapp = db.db("test");
      const pokemon = testapp.collection("pokemons");
      const pokemonCOllection = await pokemon.find().toArray();
      res.json(pokemonCOllection);
    }
  } finally {
    db?.close();
  }
});


app.listen(port, ()=>{
  console.log(`http://localhost:${port}/list`)
})

