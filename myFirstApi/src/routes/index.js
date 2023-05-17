import {Router} from 'express';
import {deleteMovie, getMovieById, insertMovie, listMovies, updateMovie} from '../controllers/movieController.js'

const routes = Router();

routes.post('/movie/add', insertMovie //toda rota é feita da mesma forma
);
routes.get('/movies', listMovies)
routes.get('/movies:id', getMovieById)

routes.put('/movie/update/:id', updateMovie)

routes.delete('/movie/delete/:id', deleteMovie)

export default routes;