import input from 'readline-sync';

// Compramos muambas e agora precisamos saber quanto vamos pagar de imposto. Construa um sistema que calcule quanto devemos pagar de imposto


// const valor = parseFloat(input.question('Quanto custou o produto? R$ '));

// console.clear();

// const imposto = valor * 0.6;
// const valorFinal = valor + imposto;

// const response = {
//     valorImposto: imposto.toFixed(2),
//     precoProduto: valor.toFixed(2),
//     valorTotal: valorFinal.toFixed(2),
// };

// console.log(`No final essa brincadeira saiu caro! O valor total foi de`, response);



// Acabamos de chagar nos EUA e percebemos que a temperatura está sendo medida em fahrenheint. Construa um programa que faça a conversão de  fahrenheint para celcius

// const fahrenheint = parseFloat(input.question('Qual a temperatura em Fahrenheint?'))

// console.clear();

// const celsius = ((fahrenheint - 32)*5)/9

// const response = {
//     tempEmFahrenheint: fahrenheint,
//     tempCelcius: celsius.toFixed(2),
// }

// console.log('A temperatura em Celcius é: ', response);


// Pregamos um emprestimo e precisamos saber quantas parcelas e o valor total com um juros de 20% 

// const valorEmprestimo = parseFloat(input.question('Qual o valor do emprestimo?'))
// const qtdParcelas = parseFloat(input.question('Em quantas vezes voce quer pagar?'))

// console.clear()

// const valorTotal = valorEmprestimo + valorEmprestimo * 0.2
// const valorParcela = valorTotal/qtdParcelas

// const response = {
//     valorTotal,
//     valorParcela,
//     valorEmprestimo,
// }

// console.log("Esses são os valores: ", response);



const peso = parseFloat(input.question("Qual o seu peso?"))
const altura = parseFloat(input.question("Qual a sua altura?"))

console.clear()

const calculaImc = ({peso,altura}) => {
    const imc = peso/altura **2
    console.log(imc);

    const verifyImc = {
        abaixoDoPeso: imc < 17,
        pesoIdeal: imc >= 17 && imc < 18.5,
        sobrepeso: imc >= 18.5 && imc < 25,
        obesidade: imc >= 25 && imc < 30,
        obesidadeSevera: imc >= 30 && imc < 35,
        obesidadeMorbida: imc >= 35 && imc < 40,
        obesidadeExtrema: imc > 40,
    }

    const messagesImc = { // essa forma de fazer é chamada de dicionário
        abaixoDoPeso: 'ABAIXO DO PESO',
        pesoIdeal: 'PESO IDEAL',
        sobrepeso: 'SOBREPESO',
        obesidade: 'OBESIDADE',
        obesidadeSevera: 'OBESIDADE SEVERA',
        obesidadeMorbida: 'OBESIDADE MORBIDA',
        obesidadeExtrema: 'OBESIDADE EXTREMA',
      };

      const result = Object.entries(verifyImc).find(([key, value]) => value === true)[0];

      const imcPerson = [
        {
            IMC: imc.toFixed(2),
            STATUS: messagesImc[result]
        }
      ]
      console.table(imcPerson);
}

// calculaImc({peso, altura})











