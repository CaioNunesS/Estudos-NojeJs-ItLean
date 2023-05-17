
let matrix = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]

const updateMatrix = (row, coll) => {
    matrix[row][coll] = player
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            // O cálculo abaixo está convertendo a matriz (row,coll) no número referente ao id da tag
            // ex: row = 1 coll = 2 -- (1 * 3 = 3) + (2 + 1 = 3) = id6 
            let button = document.getElementById((row * 3 + coll + 1).toString())
            button.innerHTML = matrix[row][coll]
            button.disabled = true
        }
    }
}

let player = "X"
let counterX = 0
let counterO = 0
let emptyField = true

const play = (move) => {
    const cell = +move.target.getAttribute("data-i")
    // O cálculo abaixo está transformando o número do id referente a cada elemento em matriz (x,y) para popular 
    let row = Math.floor(((cell - 1) / 3)) // ex: cell = 0 -- (0 -1)/3 == 0
    let coll = Math.floor((cell - 1) % 3) // ex: cell = 0 -- (0 - 1)% 3 == 0 
    updateMatrix(row, coll) // ex: cell == (0,0) (id-1)

    if (checkWinner()) {

        if (player == "X") {
            counterX++
            document.getElementById("counter1").innerHTML = counterX
        } else if (player == "O") {
            counterO++
            document.getElementById("counter2").innerHTML = counterO
        }

        alert(`Player ${player} wins!!`)

        let cells = document.querySelectorAll("button")
        for (let i = 0; i < cells.length; i++) {
            cells[i].disabled = true
            document.getElementById("btn-reset").disabled = false
            document.getElementById("btn-reload").disabled = false
        }

    } else if (draw()) {
        alert("Deu velha")
    }
    else {
        player = player === "X" ? "O" : "X";
    }
}

let cells = document.querySelectorAll("button")
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", play)
}
console.log(cells);

const reset = () => {
    let cells = document.querySelectorAll("button")
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ""
        cells[i].disabled = false
        document.getElementById("btn-reset").innerHTML = "Jogar novamente"
        document.getElementById("btn-reload").innerHTML = "Reiniciar Jogo"
    }
    matrix = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
}

const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
        if (matrix[i][0] == player && matrix[i][1] == player && matrix[i][2] == player) {
            return true
        }
        if (matrix[0][i] == player && matrix[1][i] == player && matrix[2][i] == player) {
            return true
        }
    }
    if (matrix[0][0] == player && matrix[1][1] == player && matrix[2][2] == player) {
        return true
    }
    if (matrix[0][2] == player && matrix[1][1] == player && matrix[2][0] == player) {
        return true
    }

    return false
}

const draw = () => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == "") {
                return false
            }
        }
    }
    return true
}

const reload = () =>{
    window.location.reload()
}


//-------------------------//

//chatGPT code

// let currentPlayer = "X";

// function play(event) {
//     console.log("Clique no botão detectado.");

//     const cell = event.target;
//     cell.innerHTML = currentPlayer;
//     cell.disabled = true;

//     if (checkWin()) {
//         console.log("O jogador " + currentPlayer + " ganhou o jogo!");
//         reset();
//     } else {
//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//         console.log("Jogador atual: " + currentPlayer);
//     }
// }

// function checkWin() {
//     console.log("Verificando se alguém ganhou o jogo...");

//     const cells = document.querySelectorAll("button");
//     const winningCombinations = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//     ];

//     for (let i = 0; i < winningCombinations.length; i++) {
//         const [a, b, c] = winningCombinations[i];
//         if (cells[a].innerHTML !== "" && cells[a].innerHTML === cells[b].innerHTML && cells[b].innerHTML === cells[c].innerHTML) {
//             console.log("Alguém ganhou o jogo!");
//             return true;
//         }
//     }

//     console.log("Ninguém ganhou o jogo.");
//     return false;
// }

// function reset() {
//     console.log("Reiniciando o jogo...");

//     const cells = document.querySelectorAll("button");
//     for (let i = 0; i < cells.length; i++) {
//         cells[i].innerHTML = "";
//         cells[i].disabled = false;
//     }
//     currentPlayer = "X";
// }

// const cells = document.querySelectorAll("button");
// for (let i = 0; i < cells.length; i++) {
//     cells[i].addEventListener("click", play);
// }
