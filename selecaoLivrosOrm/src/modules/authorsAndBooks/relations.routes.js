import { Router } from "express";
import { addAuthorBook, relationList, findRelationById, updateRelation, deleteRelation } from "./relations.controller.js"
import { newRelation } from "./relations.validate.js"
import { validate } from "../../middlewares/validate.js"
import { asyncWrapper } from "../../middlewares/asyncWrapper.js"
import { isAuthenticated } from '../../middlewares/isAuthenticated.js'

const relationsRoutes = Router()

relationsRoutes.post("/", isAuthenticated, validate(newRelation), asyncWrapper(addAuthorBook))
relationsRoutes.get("/:id", isAuthenticated, asyncWrapper(findRelationById))
relationsRoutes.get("/", isAuthenticated, asyncWrapper(relationList))
relationsRoutes.put("/:id", isAuthenticated, validate(newRelation), asyncWrapper(updateRelation))
relationsRoutes.delete("/:id", isAuthenticated, asyncWrapper(deleteRelation))

export { relationsRoutes }