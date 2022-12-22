const express = require('express');

const PORT = 8080;

const ProductManager = require('./ProductManager');
const productos = new ProductManager('./src/data.json');

//Inicializacion
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) =>{
    //Traer todos los productos
    const product =  await productos.getProducts();

    //Query limit
    const { limit } = req.query;

    if(limit){
        let listProduct =  product.slice(0, limit);

        return res.status(220).json({
            status: "success",
            data: listProduct
        })
        //res.status(220).send(listProduct);

    }else{  
        return res.status(220).json({
            status: "success",
            data: product
        })           
        //res.status(220).send(product);
    }

})

app.get('/products/:id', async (req, res) =>{
    //Traer todos los productos
    const product =  await productos.getProducts();
    
    //Parametro id
    const { id } = req.params;  

    //filtrar x ID
    const p = product.find(p => p.id === Number(id));

    if(!p){
        return res.status(404).json({
            status: "error",
            error: "producto no existente."
        })
    }

    return res.status(220).json({
        status: "success",
        data: p
    })     

    //res.send(p);
})

//Puesto en Marcha
app.listen(PORT, () => {
    console.log("El servidor esta levantado y corriendo por el puerto 8080");
});