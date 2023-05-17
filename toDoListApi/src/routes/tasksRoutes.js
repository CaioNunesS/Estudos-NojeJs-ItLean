import {Router} from 'express';
import {deleteTask,updateTask,getTaskById,listTask,insertTask } from '../controllers/controllerTasks.js'

const routes = Router();

routes.post('/:id/task/add', insertTask //toda rota é feita da mesma forma
);
routes.get('/:id/task', listTask)
routes.get('/:id/task/:idTask', getTaskById)

routes.put('/:id/task/update/:idTask', updateTask)

routes.delete('/:id/task/delete/:idTask', deleteTask)

export default routes;