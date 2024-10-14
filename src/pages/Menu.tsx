//Menu.js 
import { Link } from "react-router-dom";

const Menu = () => { 
    return ( 
        <div>
<div className="w-screen bg-metal text-tahiti text-center">
<div className="text-poke-yellow font-bold text-9xl text-center">
 <h1>Pokemon GeMi</h1>
</div>


</div> 

<div className="w-screen bg-metal text-tahiti text-center">
<div className="text-poke-yellow font-bold text-9xl text-center">
 <h1></h1>
</div>

   <div className="font-bold text-5xl h-56 grid grid-cols-1 gap-6 content-center ... ">

   <div>

     <button  className="h-20 w-60 hover:border-poke-yellow border-spacing-2 top-36 border-4 ..." >

                    {/* Endpoint to route to Home component */}
                    <Link to="/PickPokemon">Play</Link>
               </button>

     <div>
       <button className=" h-20 w-70 top-40    hover:border-poke-yellow border-spacing-2 border-4 ..."><Link to="/Stored"> Stored Pokemon </Link></button>
     </div>
  
   </div>


      
   </div>

</div>






</div>
    ) 
} 

export default Menu;
