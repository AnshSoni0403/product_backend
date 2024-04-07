const {default: mongoose} = require('mongoose')

const Product = require('../Models/productModels')
const { error } = require('console')

const getAllProducts = async(req,res) => {
    const product = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(product)
}

const getProduct = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid ID'})
    }

    const product = await Product.findById(id)

    //to check if the product exists or not

    if(!product){
        return res.status(404).json({message: 'Product not found'})
    }
    
    res.status(200).json(product)
}

const addProduct = async(req, res) =>{
    const {Name, Description, Quantity,BuyingPrice, MRP,Category} = req.body;

    try{
        const product = await Product.create({Name,Description, Quantity,BuyingPrice, MRP,Category})
        res.status(201).json(product)
            
    }catch(error){
        res.status(500).json({message: error.message})
    }

}

const updateProduct = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message : "Invalid id" })
    }
    const product = await  Product.findByIdAndUpdate({_id : id}, req.body , {
        runValidators: true,
        new: true,

})

if( !product ) {
return res.status(404).json({ message : "No record with provided ID was found!" });
}
res.status(200).json(product)
}

const deleteProduct = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send('Invalid ID')
    }

    const product = await Product.findByIdAndDelete({_id : id})

    if(!product){
        return res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json(product)
    }

    module.exports = {
        getAllProducts,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct
    }
