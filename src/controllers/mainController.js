const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

controller={
    root:function(req, res, next) {
      let ofertas=products.filter(function(element){
        return element.category == 'in-sale';
      })  
      let visitados=products.filter(function(element){
        return element.category == 'visited';
      })
      res.render('index', { 
          aMiles:toThousand,
          visitados:visitados,
          ofertas:ofertas  
        });
      },
    search:function(req,res,next){

    },
};

module.exports=controller;
