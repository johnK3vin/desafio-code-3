import {promises as fs} from 'fs';

export class ProductManager{
    constructor(){
        this.path = './product.json';
    }
    async nextId() {
        const prod = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        if (prod.length < 1) return 1;
        const ids = prod.map(items => items.id);
        const id = Math.max(...ids) + 1;
        return id;
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        if (!title || !price ||
            !description || !thumbnail || 
            !code || !stock) {
           return console.log("ERROR: Porfavor ingresar todos los campos")
       }
        const id = await this.nextId()
        const product =  new Product(id, title, description, price, thumbnail, code, stock);
        const prod = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = prod.find(items => items.id === product.id)
        if(prods){
            console.log("ERROR: Ya existe este producto");
            return;
        } else{
            prod.push(product)
            await fs.writeFile(this.path, JSON.stringify(prod))
            console.log("Producto agregado con exito")
        }
    }

    async updateProduct(id, product){
        if (!product.title || !product.price ||
             !product.description || !product.thumbnail || 
             !product.code || !product.stock) {
            return console.log("ERROR: Porfavor ingresar todos los campos")
        }

        const prod = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const indice = prod.findIndex(items => items.id === id);

        if(indice != -1){
            prod[indice].title = product.title
            prod[indice].price = product.price
            prod[indice].description = product.description
            prod[indice].thumbnail = product.thumbnail
            prod[indice].code = product.code
            prod[indice].stock = product.stock
            await fs.writeFile(this.path, JSON.stringify(prod))
            console.log("se ha modificado el producto con exito")
        } else{
            console.log("ERROR: No se ha encontrado ningun producto");
        }
    }

    async delateProduct(id){
        const search = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const prod = search.find(items => items.id === id);

        if(prod){
            await fs.writeFile(this.path, JSON.stringify(search.filter(items => items.id != id)))
            console.log("Producto removido con exito")
        } else {
            console.log("ERROR: Producto no encontrado")
        }
    }

    async getProducts(){
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        return prods
    }

    async getProductsById(id){
        const search = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const searchId = search.find(items => items.id === id);
        if(searchId){
            console.log(searchId)
            return(searchId);
        } else{
            console.log("ERROR: No se ha encontrado ningun producto");
        }
    }
}

class Product{

    constructor(id,title, description, price, thumbnail, code, stock){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

