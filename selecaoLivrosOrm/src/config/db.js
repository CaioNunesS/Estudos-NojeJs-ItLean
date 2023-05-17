import { Sequelize } from "sequelize"; // importar o sequelize
import "dotenv/config"; // importar o dotenv para localizar as variáveis de ambiente
const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dbDialect, //informar o tipo de banco que vamos utilizar
  host: dbHost, //o host, neste caso estamos com um banco local
  // logging: false
});

export default sequelize; 
