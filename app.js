let numeroSecreto = 0;
let inferior = 1;
let superior = 10;
let intentos = 0;
let listNumerosSorteados = [];
let posibilidadesNumeros = (superior - inferior) + 1;

function asignarTextoElemento(etiqueta, texto) {
    let elementoHTML = document.querySelector(etiqueta);
    elementoHTML.innerHTML = texto;
}


function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    intentos = parseInt(intentos);
    console.log(` Intentos: ${intentos}\n Numero Secreto : ${numeroSecreto} \n Numeros Sorteados: ${listNumerosSorteados}\n Número Usuario: ${numeroUsuario}` )
    console.log(typeof(intentos));
    if (numeroUsuario == numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} intento${intentos > 1 ? "s." : "."}`);
        document.getElementById('intentar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Usuario No acierta
        if (numeroUsuario < listNumerosSorteados[listNumerosSorteados.length-1]) {
            asignarTextoElemento('p', `El número secreto es mayor`);
        } else {
            asignarTextoElemento('p', `El número secreto es menor`);
        }
        intentos++;
        if (intentos > 3) {
            console.log("El valor de intentos ya es mayor");
            asignarTextoElemento('p', `El número secreto era ${numeroSecreto}, no pudiste averiguarlo en ${intentos -1} intento${intentos > 1 ? "s." : "."}`);
            document.getElementById('intentar').setAttribute('disabled', true);
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
        limpiarCaja();
    }
    console.log(listNumerosSorteados);
}

function generarNumeroSecreto(inferior, superior){
    let numeroGenerado = Math.floor(Math.random() * (posibilidadesNumeros)) + inferior;

    console.log(numeroGenerado);
    console.log(listNumerosSorteados);

    if (listNumerosSorteados.length == posibilidadesNumeros){
       asignarTextoElemento('p', `Ya se sortearon todos los números posibles para el rango entre ${inferior} y ${superior}.`) 
       document.getElementById('intentar').setAttribute('disabled', true);
    } else {
        if (listNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(inferior, superior);
        } else{
            listNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto.');
    asignarTextoElemento('p', `Indica un número de ${inferior} al ${superior}`);
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('intentar').removeAttribute('disabled');
    numeroSecreto = generarNumeroSecreto(inferior, superior);   
    intentos = 1;
}

function reiniciarJuego(){
    limpiarCaja();
    condicionesIniciales();
    
}


function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

condicionesIniciales();
