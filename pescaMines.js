//Variables Globales
let inputColumnas;
let inputFilas;
let celdasTotales;
let celdasSinMinaAbiertas=0;
let celdasConMina ;
let celdasSinMina;

function iniciarPartida(){
    celdasSinMinaAbiertas=0;
    do{
        inputColumnas = parseInt(prompt("Introduce el número de columnas(max 30) "));
        if( inputColumnas > 30){
                inputColumnas = 30;
        } else if( inputColumnas < 10){
            inputColumnas = 10
        }
    } while(!Number.isInteger(inputColumnas));
    do{
        inputFilas = parseInt(prompt("Introduce el número de Filas (max 30) : "));
        if( inputFilas > 30){
            inputFilas = 30
        } else if( inputFilas < 10){
            inputFilas = 10
        }
    } while(!Number.isInteger(inputFilas));
    crearTablero();
}

function crearTablero(){
 let tablero = document.getElementById("taulell");
 let tableString = "<table>";
 for(let x=0 ; x < inputFilas; x++){
    tableString+= "<tr>";
    for(let y=0 ; y < inputColumnas; y++){
        tableString += `<td class="casilla" id="${x}-${y}" data-estado="cerrado" data-num-mines="0" data-mina="false" onclick="obreCasella(${x},${y})" ><img src='imgPescaMines/fons20px.jpg' ></td>`
    }
    tableString+="</tr>";
 }
 tableString += "</table>";
 tablero.innerHTML = tableString;
 celdasTotales= inputColumnas * inputColumnas;
 celdasConMina = parseInt(celdasTotales*0.17);
 celdasSinMina=celdasTotales-celdasConMina;
 setMines();


}

function obreCasella(x, y){
    let celda = document.getElementById(`${x}-${y}`);
    if (celda.getAttribute("data-estado") === "cerrado") {
        celda.setAttribute("data-estado", "abierto");
        if (esMina(x, y)) {
            // Recorremos el tablero para buscar las minas restantes y mostrarlas
            for (let i = 0; i < inputFilas; i++) {
                for (let j = 0; j < inputColumnas; j++) {
                    if (esMina(i, j)) {
                        let mina = document.getElementById(`${i}-${j}`);
                        mina.innerHTML = "<img src='imgPescaMines/mina20px.jpg'>"; // Cambiar por la imagen de mina
                    }
                }
            }
            alert("¡Has perdido! Inténtalo de nuevo.");
        } else {
            let numMinasAdyacentes = calculaAdjacents(x, y);
            celda.innerHTML = numMinasAdyacentes;
            
            // Incrementar el conteo de celdas abiertas sin mina
            celdasSinMinaAbiertas++;

            // Verificar si todas las celdas sin mina han sido abiertas
            if (celdasSinMinaAbiertas == celdasSinMina) {
                alert("¡Has ganado!");
            }
        }
    }
}

function setMines(){
    // Coloca las minas en el tablero
    let idRandom;
    let arrayRandoms =[];
    console.clear();
    for (let x = 0; x < celdasConMina; x++) {
      do{
        idRandom = Math.floor(Math.random() * inputFilas)+"-"+Math.floor(Math.random()* inputColumnas);
      } while(arrayRandoms.includes(idRandom) || document.getElementById(idRandom).dataset.min == true) // Comprobamos que no se haya puesto una mina sobre el mismo ID.
      document.getElementById(idRandom).dataset.mina=true;
      arrayRandoms.push(idRandom);
    }
    //Comprobaciones por consola
    arrayRandoms.forEach(function(element) {
        console.log(element); //Por si quieres ganar de forma fácil para saber donde estan las minas
    });
    console.log(arrayRandoms.length); //Para que puedas saber el número de minas que hay según los inputs
  }


function calculaAdjacents(x, y){
    let count = 0;
    // Verifica las celdas adyacentes para contar minas
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < inputFilas && j >= 0 && j < inputColumnas && !(i === x && j === y)) {
                if (esMina(i, j)) {
                    count++;
                }
            }
        }
    }
    setMinesAdjacents(x, y, count);
    return count > 0 ? count : '';
}

function esMina(x, y){
    let celda = document.getElementById(`${x}-${y}`);
    return celda.getAttribute("data-mina") === "true";
}

function setMinesAdjacents(x, y, nMinesAdjacents){
    let celda = document.getElementById(`${x}-${y}`);
    celda.setAttribute("data-num-mines", `${nMinesAdjacents}`);
}

