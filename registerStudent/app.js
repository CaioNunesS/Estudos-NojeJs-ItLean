import 'dotenv/config'; // acessas as váriaveis de ambiente
import express from 'express'; //cria um servidor na máquina que acessa a porta definida
import cors from 'cors'; //define qual dominio irá ser bloqueado ou liberado
import routes from './src/routes/routes.js'

const app = express() // utilizando a biblioteca express para facilitar a criação de um servidor
const port = process.env.PORTA || 3000;

app.use(cors()) // desbloquei todos os dominios
app.use(express.json())// permite que o servidor receba e envie jsons
app.use(express.urlencoded({extended: true}))//pega a rota e baseado no parametro consegue traduzir caso tenha traços e etc e libera para acessar

app.use('/api', routes)

app.listen(port, ()=> console.log(`Listening on port ${port}`)) // escutando a porta definida, no caso a 8080 ou 3000