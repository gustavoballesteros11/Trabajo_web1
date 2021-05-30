
const url="https://accounts.spotify.com/api/token";


let llave1 = "grant_type=client_credentials"
let llave2= "client_id=6f8a22d7e66a467c8e122c4d198b07f9"
let llave3= "client_secret=9d2d19bba63c4b34beddcba7aae235ac";
let tokenAuto = undefined;



let peticion2 ={
    method:"POST",
    headers:{"Content-Type": 'application/x-www-form-urlencoded'},
    body:llave1+'&'+llave2+'&'+llave3
}


fetch(url, peticion2)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(datos){
        tokenAuto = `${datos.token_type} ${datos.access_token}`;
        solicitarCanciones(tokenAuto);
    })


function solicitarCanciones(tokenAuto){
    let urlGet = "https://api.spotify.com/v1/artists/4gOoiVWzfjPtXK3ohuEy0M/top-tracks?market=US"

    let peticionGet = {
        method : "GET",
        headers:{
            Authorization:tokenAuto
        }
    }

    fetch(urlGet, peticionGet)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(datos){
        depurarDatos(datos);
    })
}


function depurarDatos(datos){

    let pistas = datos.tracks;

    let datosFiltrados = pistas.map(function(pista){
        return{
            nombre:pista.name,
            audio:pista.preview_url,
            foto:pista.album.images[0].url,
            popularidad:pista.popularity
        }
    })
    mostrarDatos(datosFiltrados);
}

function mostrarDatos(datosFiltrados){
    let contenedorPadre = document.getElementById("contenedorPadre");

    datosFiltrados.map(function(pista){
        
        

        let contenedorColumna = document.createElement("div");
        contenedorColumna.classList.add("col");

        
        let contenedorCard = document.createElement("div");
        contenedorCard.classList.add("card");
        contenedorCard.classList.add("h-100");

        
        

        let cardIMG = document.createElement("img");
        cardIMG.classList.add("card-img-top");
        cardIMG.src = pista.foto;

        
        let tituloCancion = document.createElement("h5");
        tituloCancion.classList.add("card-title", "text-center");
        tituloCancion.textContent = pista.nombre;

        
        let audioCancion = document.createElement("audio");
        audioCancion.controls = true;
        audioCancion.src = pista.audio;
        audioCancion.classList.add("align-self-center");


        
        
        contenedorCard.appendChild(audioCancion);

        contenedorCard.appendChild(tituloCancion);

        contenedorCard.appendChild(cardIMG);

        contenedorColumna.appendChild(contenedorCard);

        contenedorPadre.appendChild(contenedorColumna);


    })
}


