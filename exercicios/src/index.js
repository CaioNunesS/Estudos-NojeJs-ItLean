import { getCurrencyCode } from "./service/index.js" // destruct

const convertBrlToDolar = async (brl) => {
    // const valueBrl = brl.replace(',', '.')
    
    const valueDolar = await getCurrencyCode('USD-BRL')
    const valueBitcoin = await getCurrencyCode('BTC-BRL')

    console.log('Valor bitcoin ==>', valueBitcoin);

    console.log('Valor dolar ==> ',valueDolar);

    const myDolars = brl/ valueDolar

    
    let number = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(myDolars);

    console.log(`Você tem ${number}`);
}

convertBrlToDolar(1000)
