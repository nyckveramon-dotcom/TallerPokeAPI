async function buscarpokemon(pokemon) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if(!respuesta.ok){
    console.log("Algo no salio bien con el codigo: ", respuesta.status);
    return null
  }

  const datos = await respuesta.json();
  return datos;
  
}

function mostrarFicha(datos){

  if(!datos){
    console.log("No hay nada que mostrar")
    return
  }

  console.log(datos.name.toUpperCase());
  console.log(datos.id);
  

  console.log("TIPOS: ")

  let listatipos = []

  for(const tipos of datos.types){
    listatipos.push(tipos.type.name)
  }

  console.log(listatipos.join(" / "));
  
  const altura = datos.height * 10
  console.log(altura);
  
  const peso =datos.weight /10
  console.log(peso);
  
  

  console.log ("STATUS: ")

  for(const estatus of datos.stats){
    console.log(estatus.stat.name);
    console.log(estatus.base_stat);
    
  }

  console.log("HABILIDAD: ");
  
  for(const habilidad of datos.abilities){
    console.log(habilidad.ability.name);
  }

}

function obtenerStat(datos, nombreStat){
  for(const dato of datos.stats){

    if (dato.stat.name === nombreStat){
      return dato.base_stat;
    }
  }

  return null
}

async function compararPokemon(pokemon1, pokemon2, nombreStat){
  const datos1 = await buscarpokemon(pokemon1);
  const datos2 = await buscarpokemon(pokemon2);

  if( datos1 === null || datos2 === null){
    console.log("No contiene datos");
    return
  }

  const stat1 = obtenerStat(datos1, nombreStat);
  const stat2 = obtenerStat(datos2, nombreStat);

  if(stat1 === null || stat2 === null){
    console.log("No se encontró el stat");
    return
  }

  if(stat1 > stat2){
    console.log("El ", pokemon1, " tiene mayor stat");
  }else if (stat2 > stat1){
    console.log("El ", pokemon2, " tiene mayor stat");
  }else{
    console.log("El ", pokemon1, " y ", pokemon2, " tienen el mismo stat");
  }
}

async function pokemonMasFuerte(listapokemon, nombreStat) {
  let mejorValor = null
  let mejorPokemon = null

  for(const pokemon of listapokemon){
    const datos = await buscarpokemon(pokemon)

    if (datos === null){
      continue
    }

    const valorStat = obtenerStat(datos, nombreStat)

    if(valorStat > mejorValor){
      mejorValor = valorStat;
      mejorPokemon = pokemon
    }

  }

  return mejorPokemon
}

const equipo = ["charmander", "wartortle", "venusaur", "rattata", "butterfree","charizard" ]

pokemonMasFuerte(equipo, "attack").then(resultado => {
  console.log(resultado)

  buscarpokemon(resultado).then(datos =>{
    mostrarFicha(datos)
  })
})

