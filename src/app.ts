import express from "express";
import {productsRouter} from "./routes/products-router";
import {getTestsRoutes} from "./routes/test";
import {db} from "./db/db";

export const app = express()
export const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)

app.use('/products', productsRouter)

const testsRoutes = getTestsRoutes(db)
app.use('/__test__', testsRoutes)