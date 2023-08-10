import { ProductManager } from "./clases.js";
import express from "express";

const PORT = 8080
const app = express()
const product = new ProductManager()

app.get('/', (req, res) => {
    res.send("hola mundo")
})

app.get('/products', async(req, res)=>{
    const { limit } = req.query
    const list = await product.getProducts()

    if(!isNaN(limit) && limit != 0 && limit <= list.length){
        const limit_list = list.slice(0, limit)
        res.send(limit_list)
    }else{
        const allProduct = await product.getProducts()
        res.send(allProduct)
    }
})

app.get('/products/:id' , async(req, res) =>{
    const id = parseInt(req.params.id)
    const list = await product.getProductsById(id)

    if(list){
        res.send(list)
    }else{
        res.send({error : "El producto no existe"})
    }

})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})