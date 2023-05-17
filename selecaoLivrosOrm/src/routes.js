import express from "express";
import { authorRoutes } from "./modules/authors/author.routes.js";
import { bookRoutes } from "./modules/books/book.routes.js";
import { userRoutes } from "./modules/users/user.routes.js";
import { fileRoutes } from "./modules/files/file.routes.js";
import { userRoutesAuth } from "./modules/auth/auth.routes.js";
import { relationsRoutes } from "./modules/authorsAndBooks/relations.routes.js";

const routes = express.Router();

routes.use('/author', authorRoutes);
routes.use('/book', bookRoutes);
routes.use('/user', userRoutes);
routes.use('/auth', userRoutesAuth);
routes.use('/file', fileRoutes);
routes.use('/relation', relationsRoutes);

export default routes;