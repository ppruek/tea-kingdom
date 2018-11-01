const express = require('express');
const router = express.Router();
const multer = require('multer');


const Product = require('../models/product');

const storage = multer.diskStorage({
    
    //source of uploaded images
    destination: function(req, file, cb) {
        cb(null, './public/uploads/product_images/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);   //the name of file
    }
});

const fileFilter = (req, file, cb) => {
    
    //accept only jpeg and png
    if (file.mimetype === 'image/jpeg' || file,mimetype === 'image/png'){
        cb(null, true);       
    } else {
        cb(null, false);
    }
};

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});

router.post('/add', upload.single('productImage'), function(req, res){

    console.log(req.file);

    Product.findOne({
        name: req.body.name,
        brand: req.body.brand,
        type: req.body.type
    })
        .then(product => {
            if(product){
                res.json({
                    status: 'The product already exist'
                })
            } else{

                var path = req.file.path;
                var slicePath = path.slice(7);

                var newProduct = new Product({
                    name: req.body.name,
                    brand: req.body.brand,
                    type: req.body.type,
                    discountPrice: req.body.discountPrice,
                    price: req.body.price,
                    weight: req.body.weight,
                    region: req.body.region,
                    description: req.body.description,
                    review: req.body.review,
                    score: req.body.score,
                    process: req.body.process,
                    amount: req.body.amount,
                    pending: req.body.pending,
                    productImage: slicePath
                })

                newProduct.save()
                    .then(product => {
                        res.json({
                            status: 'Successfully Pending Prodcut'
                        })
                    })
            }
        })
})

module.exports = router;