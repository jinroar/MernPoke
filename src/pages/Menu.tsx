//Menu.js 
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="w-screen h-screen bg-metal">
      <div className="w-screen bg-metal text-tahiti text-center ">
        <div className="text-poke-yellow font-bold text-9xl text-center">
          <h1>Pokemon GeMi</h1>
        </div>
      </div>



      <div className=" relative top-40  w-screen bg-red text-poke-yellow text-center">
      
        <div className="  shadow-2xl font-bold text-5xl h-56 grid grid-cols-1 gap-x-28 place-content-center ... ">

          <button className=" shadow-2xl  h-20  hover:border-tahiti border-spacing-2 top-36 border-4 ... bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4" >

            {/* Endpoint to route to Home component */}
            <Link to="/PickPokemon">Play</Link>
          </button>

          <button className="  shadow-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <Link to="/Stored"> Stored Pokemon </Link>
          </button>

        </div>

      </div>

    </div>
  )
}

export default Menu;