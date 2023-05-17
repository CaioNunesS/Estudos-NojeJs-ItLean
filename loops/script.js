//Loop For//

//1. For

for(let i = 1; i <= 5; i++){
    console.log('Estou aprendendo' ,i);

}

//2. While
let j = 5;
while(j >= 1){
    if(j % 2 !== 0){
        console.log('j',j);
    }
    j --;
}

//3. Do..while
let x = 1;
do {
    console.log('digitando' ,x);
    x++;
} while (x < 10)

//4. For..in
const pessoa = {
    nome: 'Caio',
    idade: 24
};

for (let chave in pessoa)
    console.log(chave , pessoa);

    const cores = ['vermelho','azul','verde'];

    for (let indice in cores){
        console.log(indice,cores[indice])
    }

// 5.For..of
for(let cor of cores){
    console.log(cor);
}