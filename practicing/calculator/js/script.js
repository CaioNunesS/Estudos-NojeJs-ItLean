let calculation = '';
let display = document.getElementById('display');

function updateDisplay(value) {
    calculation += value;
    display.value = calculation;
}

function clearDisplay(){
    calculation = '';
    display.value = '';
}

// function calculate(){
//     try {
//         calculation = eval(calculation);
//         display.value = calculation;
//     } catch (error) {
//         display.value = 'Operação inválida';
//     }
// }

// function calculate() {
//     try {
//       let result = calculateWithoutEval(calculation)
//     } catch (error) {
//         display.value = 'Operação inválida'
//     }
// }

function tokenize(str) {
    const result = []
    let token = ''
    display.value = ''

    for (const character of str) {
        if ('*/+-'.includes(character)) {
            if(token === '' && character === '-'){
                token = '-'
            }else{
                result.push(parseFloat(token), character)
                token = ''
            }
        }else{
            token += character
        }
    }
    if(token !== ''){
        result.push(parseFloat(token))
    }
    return result
}

function calculate() {
    let tokens = tokenize(calculation)

    const operatorPrecendece = [
        {'*': (a,b) => a * b, '/': (a,b) => a / b},
        {'+': (a,b) => a + b, '-': (a,b) => a - b},
    ]
    let operator
    for (const operators of operatorPrecendece) {
        const newToken = []
        for (const token of tokens) {
            if(token in operators){
                operator = operators[token]
            }else if(operator){
                newToken[newToken.length -1] = operator(newToken[newToken.length - 1],
                    token
                )
                operator = null
            }else{
                newToken.push(token)
            }
        }
        tokens = newToken

    }
    if (tokens.length > 1 || tokens.length === 0) {
        display.value = 'Error'
    }else{
        display.value = tokens[0]
    }
}


// function calculateWithoutEval(entrada){
//     let result = 0
//     let numbers = []
//     let operators = ''

//    numbers = entrada.split(/([\+\-\*\/\%])/).filter((element => element.trim() != ""))
//    console.log(numbers);
//    operators = numbers

// }