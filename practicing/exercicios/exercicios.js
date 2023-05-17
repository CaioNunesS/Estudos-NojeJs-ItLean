//1. Escreva uma função que receba uma string e retorne a mesma string invertida. Exemplo:

//entrada: "hello world"
//saida: "dlrow olleh"

function invert(str) {
    return str.split('').reverse().join('')
}

// console.log(invert("abobora maca"));

//2. Escreva uma função que receba um array de números e retorne o maior número encontrado. Exemplo:

//entrada: [3, 7, 2, 8, 1]
//saida: 8

let nums = [1, 3, 2, 6, 9, 4]

function biggerNumber(arr) {
    let result = arr.sort((a, b) => { return b - a })
    console.log(result[0]);
}
// biggerNumber(nums)

//3. Escreva uma função que receba um objeto e retorne a quantidade de propriedades que esse objeto possui. Exemplo:

//entrada: { a: 1, b: 2, c: 3 }
//saida: 3

let inputData = {
    a: 1,
    b: 2,
    c: 3
}

function howManyPropsInTheObj(obj) {
    let counter = 0
    for (let prop in obj) { counter++ }
    console.log(inputData);
}
// howManyPropsInTheObj(entrada)

//4. Escreva uma função que receba dois arrays e retorne um novo array contendo apenas os elementos que aparecem em ambos os arrays. Exemplo:

//entrada: [1, 2, 3], [2, 3, 4]
//saida: [2, 3]

function commomBetweenArrays(arr1, arr2) {
    let specificProp = []

    for (let i = 0; i < arr1.length; i++) {

        for (let index = 0; index < arr2.length; index++) {
            if (arr1[i] == arr2[index]) {
                specificProp.push(arr1[i])
            }
        }
    }
    console.log(specificProp);
}
// commomBetweenArrays([1,4,5],[6,4,2,5])

//5. Escreva uma função que receba uma string e retorne um objeto contendo a contagem de cada letra encontrada na string. Exemplo:

//entrada: "hello world"
//saida: { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }

function receiveStrReturnObj(str) {
    let obj = {}
    for (let i = 0; i < str.length; i++) {
        if (str[i] in obj) {
            obj[str[i]] += 1
        } else {
            obj[str[i]] = 1
        }
    }
    console.log(obj);
}

// receiveStrReturnObj("abacaxiei")

//6. Escreva uma função que receba um array de objetos e retorne um novo array contendo apenas os objetos que possuem uma determinada propriedade e valor. Exemplo:

//entrada: [{ name: "Alice", age: 20 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 30 }], "age", 25
//saida: [{ name: "Bob", age: 25 }]

let object = [
    {name: "Caio", age: 25},{name: "Manu", age: 22},{name: "Rafa",age: 23},
    {name: "Joao",age: 25},{name: "Erick",age: 24}
]

function showArrOfObj(obj, val) {
    let prop = []
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].age == val) {
            prop.push(obj[i])
            console.log(prop);
        }
    }
}

// showArrOfObj(object,23)

//7. Escreva uma função que receba uma string contendo parênteses e retorne true se a string contiver uma sequência válida de parênteses e false caso contrário. Exemplo:

//entrada: "()()()"
//saida: true

//entrada: "((()))"
//saida: true

//entrada: "(()"
//saida: false

function rightParentheses(str) {
    let counter1 = 0
    let counter2 = 0
    let result = false
    let broke = str.split('')
    for (let i = 0; i < broke.length; i++) {
        if (broke[i] == "(") {
            counter1++
        } if (broke[i] == ")") {
            counter2++
        }
    }
    if (counter1 == counter2) {
        console.log(result = true);
    } else {
        console.log(result = false);
    }
}

// rightParentheses("(())()")


//Escreva uma função que receba uma matriz de números (ou seja, um array de arrays) como parâmetro e retorne a matriz transposta (ou seja, com as linhas e colunas invertidas).

//A função deve receber uma matriz de entrada (no caso, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]) e retorna a matriz transposta correspondente ([[1, 4, 7], [2, 5, 8], [3, 6, 9]])

let matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// console.log(matriz[0])

function returnMatrixtransposit(arr) {
    let newMatrix = []
    for (let i = 0; i < arr.length; i++) {
        newMatrix[i] = []
        for (let index = 0; index < arr[i].length; index++) {
            newMatrix[i][index] = arr[index][i]
        }
    }
    console.log(newMatrix);
}
// returnMatrixtransposit(matriz)

//List-4 resolution//

// 1. Crie uma função que imprima todos os números pares de 0 a 100 usando um loop for.

const pairsFrom0To100 = () => {
    let pares = ''
    for (let i = 0; i <= 100; i++) {
        if (i % 2 == 0) {
            pares = i
            console.log(pares);
        }
    }
}

// pairsFrom0To100()

//2. Crie uma função que recebe uma lista de números e retorna a soma de todos os números pares da lista.
const sumOfPairsFrom0To100 = () => {
    let result = 0
    let pares = 0
    for (let i = 0; i <= 100; i++) {
        if (i % 2 == 0) {
            pares += i
        }


    }
    console.log(pares);
}

// sumOfPairsFrom0To100()

//3. Crie uma função que recebe uma lista de strings e retorna uma lista com todas as strings que possuem mais de 5 caracteres.

let stringList = ["maça", "camundongo", "açai", "omelete", "uva", "casca"]
const stringsLongerThan5 = (str) => {

    let moreThan5Letters = []
    for (let i = 0; i < str.length; i++) {
        if (str[i].length > 5) {
            moreThan5Letters.push(str[i])
        }
        console.log(str[i]);
    }

    console.log(moreThan5Letters);

}

// stringsLongerThan5(stringList)

//4. Crie uma função que recebe um número e verifique se esse número é um número primo.

function isPrime(num) {
    for (let i = 2; i < num; i++)
        if (num % i === 0) {
            return false
        };
    return num > 1;
}

//   console.log(isPrime(2));

//5. Crie uma função que recebe um número como argumento e retorna o fatorial desse número.

const factorial = (num) => {
    let result = 1
    for (let i = 1; i <= num; i++) {
        result *= i
    }
    console.log(result);
}
// factorial(5)

//Desafio:

//Crie a funcionalidade do jogo da velha com Javacript.
//Observação: O HTML e CSS estão na pasta "jogoDaVelha"


// exercicios 16-03-23



