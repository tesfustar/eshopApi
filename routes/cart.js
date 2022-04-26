const Cart = require('../models/Cart');

const { verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyToken } = require('./VerifyToken');

const router = require('express').Router();

//create cart
router.post("/",verifyToken,async(req,res)=>{
    const newCart =  Cart(req.body)
    try{
    const savedCart = await newCart.save()

        res.status(200).json(savedCart)

    }catch(err){
        res.status(500).json(err)
    }
})
//update cart
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
    

        res.status(200).json(updatedCart)

    }catch(err){
        res.status(500).json(err)
    }
})
//delate cart

router.delete("/:id",verifyToken,async(req,res)=>{
    
    try{
      await Cart.findByIdAndDelete(req.params.id)

       res.status(200).json("Cart has been deleted succcessfully")

   }catch(err){
       res.status(500).json(err)
   }
})

//get cart
router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    
    try{
     const cart =  await Cart.findOne({userId:req.params.userId})
       res.status(200).json(cart)
   }catch(err){
       res.status(500).json(err)
   }
})


// GETALLCART
router.get("/",verifyTokenAndAdmin,async(req,res)=>{

    try{
       
     const cart = await Cart.find();
     res.status(200).json(cart)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports =router