import {Router} from 'express';
import {deleteStudent,updateStudent,getStudentById,listStudents,insertStudent } from '../controller/controller.js'

const routes = Router();

routes.post('/student/add', insertStudent //toda rota é feita da mesma forma
);
routes.get('/students', listStudents)
routes.get('/students/:id', getStudentById)

routes.put('/student/update/:id', updateStudent)

routes.delete('/student/delete/:id', deleteStudent)

export default routes;