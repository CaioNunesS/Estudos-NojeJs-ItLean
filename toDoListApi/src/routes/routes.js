import {Router} from 'express';
import {deleteToDo,updateToDo,getToDoById,listToDo,insertToDo } from '../controllers/controller.js'

const routes = Router();

routes.post('/add', insertToDo //toda rota é feita da mesma forma
);
routes.get('/', listToDo)
routes.get('/:id', getToDoById)

routes.put('/update/:id', updateToDo)

routes.delete('/delete/:id', deleteToDo)

export default routes;