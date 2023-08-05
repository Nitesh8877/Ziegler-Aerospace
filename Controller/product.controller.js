const Product=require('../models/product.model');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    let query = {};

    const productName = req.query.name;
    const minCost = req.query.minCost;
    const maxCost = req.query.maxCost;

    if (productName) {
      query.name = productName;
    }
    if (minCost && maxCost) {
      query.price = { $gte: minCost, $lte: maxCost };
    } else if (minCost) {
      query.price = { $gte: minCost };
    } else if (maxCost) {
      query.price = { $lte: maxCost };
    }
    console.log(query)
    const products = await Product.find(query);
    console.log(products)
    res.status(200).send({data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
  
};

  // Create a new product
const createProduct = async (req, res) => {
    try {
      console.log(req.email,req._id)
      const { name, description, price,seller } = req.body;
  
      const newProduct = new Product({
        name,
        description,
        price,
        seller
      });
  
      const savedProduct = await newProduct.save();
      res.status(201).send(savedProduct);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred while creating the product.',error });
    }
  };

  const search=async(req,res)=>{
        let productId=req.params.id;
        try {
            let product=await Product.findOne({_id:productId});
            res.status(200).send({
                data:product
            })
        } 
            catch (error) {
                res.status(500).send({ message: 'An error occurred while creating the product.' });
              }
  }

  module.exports={
    getAllProducts,
    createProduct,
    search
  }