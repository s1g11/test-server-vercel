import express, {Response} from "express";
import {ProductGetModel, ProductViewModel} from "../models/models";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../types/types";
import {productsRepository} from "../repositories/products-repository";
import {body, ValidationError, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const productsRouter = express.Router({})

const titleValidation = body('title').trim().isLength({
    min: 4,
    max: 30
}).withMessage('title length should be from 3 to 10 symbols')

productsRouter.get("/", (req: RequestWithQuery<ProductGetModel>, res: Response<ProductViewModel[]>) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    res.status(200).send(foundProducts)
})

productsRouter.get("/:id", (req: RequestWithParams<{ id: number }>, res: Response<ProductViewModel>) => {
    const foundProduct = productsRepository.findProductById(+req.params.id)

    if (!foundProduct) {
        res.status(404)
    } else {
        res.send(foundProduct)
    }
})

productsRouter.post("/", titleValidation, inputValidationMiddleware, (req: RequestWithBody<{
    title: string
}>, res: Response<ProductViewModel | { errors: ValidationError[] }>) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    return res.status(201).send(newProduct)

})