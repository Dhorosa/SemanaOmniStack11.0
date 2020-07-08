const express = require('express');
const cors = require('cors');
const { errors} = require('celebrate');


const routes = require('./routes');


const app = express();


app.use(cors());   
app.use(express.json());

app.use(routes);
app.use(errors()); 
/**
 * Métodos HTTP:
 * 
 * Get: Busca/listar uma informação do back-end
 * Post: Criar uma informação no back-end
 * Put: alterar uma informação no Back-end
 * Delete: Deletar uma Informação no back-end
 */

/** 
 * Tipos de Parâmetros
 * 
 * Query Params: Parâmetors nomeado enviados na rota após "?"(Filtros, Paginação)
 * Route Params: Parâmetros Utilizados para identificar recursos
 * Request body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/** 
 * SQL : SQLite
 * NoSQL: MongoBD
 * 
 */
/**
 * 
 * Driver: SELECT * FROM users
 * Query Builder : table('users').select('*').where()
 */


app.listen(3333);