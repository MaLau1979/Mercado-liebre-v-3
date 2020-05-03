const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products',{
			productos:products,
			aMiles:toThousand
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product= products.find(function(element){
			return element.id==req.params.productId;
		});
		res.render('detail',{
			aMiles:toThousand,
			producto:product
		})
    },
	
	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');	
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let ultimoProducto=products[products.length-1];
		let nuevoProducto={};
		nuevoProducto.id=ultimoProducto.id+1
		nuevoProducto.name=req.body.name
		nuevoProducto.price=req.body.price
		nuevoProducto.discount=req.body.discount
		nuevoProducto.category=req.body.category
		nuevoProducto.description=req.body.description
		
		products.push(nuevoProducto);

		let productosModificadosJson=JSON.stringify(products);
		fs.writeFileSync(productsFilePath,productosModificadosJson);
		res.send(products);
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product=products.find(function(element){
			return element.id==req.params.productId;
		})
		res.render('product-edit-form',{
			aMiles:toThousand,
			productToEdit:product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let productUpdate=[];
		products.forEach(element => {
			if(element.id==req.params.id){
				element.name=req.body.name
				element.price=req.body.price
				element.discount=req.body.discount
				element.category=req.body.category
				element.description=req.body.description
				return productUpdate=element;
			}
			
		});
		let productosModificadosJson=JSON.stringify(products);
		fs.writeFileSync(productsFilePath,productosModificadosJson);

		res.send(products);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productsQueQuedan=products.filter(function(element){
		return element.id!=req.params.productId;
		})
		let productosModificadosJson=JSON.stringify(products);
		fs.writeFileSync(productsFilePath,productosModificadosJson);
		res.send(productsQueQuedan);
	}
};

module.exports = controller;