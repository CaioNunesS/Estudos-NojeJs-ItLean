import { Router } from "express";
import { create, listAll, remove, findByPk, update } from "./author.controller.js"
import { validate } from '../../middlewares/validate.js'
import { asyncWrapper } from '../../middlewares/asyncWrapper.js'
import { newAuthor } from "./author.validation.js";
import { isAuthenticated } from '../../middlewares/isAuthenticated.js'

const authorRoutes = Router()

authorRoutes.get("/", isAuthenticated, asyncWrapper(listAll))
authorRoutes.get("/:id", isAuthenticated, asyncWrapper(findByPk))
authorRoutes.post("/", isAuthenticated, validate(newAuthor), asyncWrapper(create))
authorRoutes.put("/:id", isAuthenticated, validate(newAuthor), asyncWrapper(update))
authorRoutes.delete("/:id", isAuthenticated, asyncWrapper(remove))

export { authorRoutes }