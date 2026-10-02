async function buscarpokemon() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon");
  
  const datos = await respuesta.json();

  console.log("TIPOS: ")
  
  for(const tipos of datos.types){
    console.log(tipos.type.name);
  }

  console.log ("STATUS: ")

  for(const estatus of datos.stats){
    console.log(estatus.stat.name);
  }

  console.log("HABILIDAD: ");
  

  for(const habilidad of datos.abiities){
    console.log(habilidad.ability.name);
  }


}
buscarpokemon("pikachu");