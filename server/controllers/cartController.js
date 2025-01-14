import userModel from "../models/userModel.js";

// Add item to user cart

const addToCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true ,message : "Item added to cart", status : 200});
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error adding item to cart", status : 500});
    }

}

// Remove item from user cart
const removeFromCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({ success:true ,message : "Item removed from cart", status : 200});


    } catch (error) {
        console.log(error)
        res.json({ success:false, message:"Error removing item from cart", status : 500});
    }
}

// Fetch user cart data 
const getCart = async(req,res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({success:true, cartData, status : 200});
    } catch (error) {
        console.log(error)
        res.json({success:false, message : "Error fetching cart data", status : 500});
    }
}

export {addToCart, removeFromCart, getCart};