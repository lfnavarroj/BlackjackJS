/* 2C--> Dos de tréboles.
/* 2D--> Dos de diamante.
/* 2H--> Dos de corazones.
/* 2S--> Dos de espadas.
*/

let deck=[];
const tipos=["C","H","D","S"];
const especiales=["A","J","Q","K"];

// Referencias HTML
const botonPedir=document.querySelector("#btnPedir");
const botonDetener=document.querySelector("#btnDetener");
const botonNuevo=document.querySelector("#btnNuevo");



const puntosHtml=document.querySelectorAll('small');

const divCartaJugador=document.querySelector("#jugador-cartas");
const divCartaComputadoras=document.querySelector("#computadora-cartas");

let puntosJugador=0;
let puntosComputadora=0;

const crearDeck=()=>{

    for(i=2;i<=10;i++){
        for (let tipo of tipos) {
            deck.push(i+tipo);
        }
    }

    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push(especial+tipo);
        }  
    }

    // console.log(deck);

    deck=_.shuffle(deck);
    console.log(deck);

    return deck;


}

crearDeck();

//crear la función para tomar una carta

const pedirCarta=()=>{

    if (deck.length===0) {
        throw "No hay cartas en el deck";
    }
    let carta=deck.pop();
    return carta;
}
// pedirCarta();

// const valorCarta=(carta)=>{

//     //extrer la primera letra

//     const valor=carta.substring(0,carta.length-1);
//     let puntos=0;

//     if (isNaN(valor)) {
//         console.log("No es un nnúmero");
//         puntos=(valor===A)?11:10;
        
//     }else{
//         console.log("Es un número");
//         // puntos=Number(valor);
//         puntos=valor*1;
//         console.log(puntos);
//     }

// }
const valorCarta=(carta)=>{
    const valor=carta.substring(0,carta.length-1);
    return (isNaN(valor))? ((valor==="A")?11:10):(valor*1);
}


// eventos



botonPedir.addEventListener('click',()=>{

   
    const carta=pedirCarta();
    puntosJugador=puntosJugador+valorCarta(carta);
    puntosHtml[0].innerText=puntosJugador;

    const imgCarta=document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('cartas');
    divCartaJugador.append(imgCarta);

    if (puntosJugador>21) {
        console.log(('Lo siento Mucho, perdiste'));
        botonPedir.disabled=true;
        botonDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador===21) {

        console.log('21, genial');
        botonPedir.disabled=true;
        botonDetener.disabled=true;
        turnoComputadora(puntosJugador);

    }

});

const turnoComputadora=(puntosMinimos)=>{

    do {

        const carta=pedirCarta();
        puntosComputadora=puntosComputadora+valorCarta(carta);
        puntosHtml[1].innerText=puntosComputadora;
    
        const imgCarta=document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('cartas');
        divCartaComputadoras.append(imgCarta);

        if (puntosMinimos>21) {
            break;
        }
        
    } while ((puntosComputadora<puntosMinimos)&& (puntosMinimos<=21));

    setTimeout(()=>{

        if ((puntosComputadora>puntosMinimos) && (puntosComputadora<=21)){
            alert("Computadora gana")
        } else if(puntosComputadora===puntosMinimos){
            alert("Empate entre Computadora y Jugador");
        }else if ((puntosMinimos>21)&&(puntosComputadora<=21)){
            alert("Computadora gana");
        }else{
            alert("Jugador Gana")
        }

    },100);
}

botonDetener.addEventListener('click',()=>{

    botonPedir.disabled=true;
    botonDetener.disabled=true;
    turnoComputadora(puntosJugador);

});

botonNuevo.addEventListener('click',()=>{

    deck=[];

    crearDeck();
    botonPedir.disabled=false;
    botonDetener.disabled=false;
    puntosComputadora=0;
    puntosJugador=0;
    puntosHtml[0].innerText=0;
    puntosHtml[1].innerText=0;
    divCartaComputadoras.innerHTML="";
    divCartaJugador.innerHTML="";

});



