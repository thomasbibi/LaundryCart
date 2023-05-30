const express = require('express')
const router = express.Router()
const Order = require('../Models/ordersModel')
const jwtAuth = require('../Middlewares/auth.js')

router.post('/create',jwtAuth,async (req,res)=>{
    console.log(req.body)
    try{
       
        const {store , date_time,status,total_items,city,phone} = req.body[0]
        let {price} = req.body[0]
        price = Number(price)
        price += 100
        const newOrder = await Order({
            user : res.user.id,
            date_time ,total_items, store,price, city,status, phone,
            orderDetails : req.body[1]
        })
        await newOrder.save()
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
})

router.post("/get-Orders",jwtAuth, async (req, res) => {
    try {
        // //console.log(res.user.id);
        const { id } = res.user
        const orders = await Order.find({ user: id })
        res.status(200).json(orders)
    } catch (error) {
        //console.log(error);
        res.status(500).json("Server Error")
    }
})

router.put("/cancel/:id", jwtAuth, async (req, res) => {
    try {
        const { id } = req.params
        const modifyOrder = await Order.findOne({ _id: id })
        //console.log(modifyOrder.status);
        modifyOrder.status = "Cancelled"
        await modifyOrder.save()
        res.status(200).json("Order Cancelled")
    } catch (error) {
        //console.log(error.message);
        res.status(500).json("Server Error")
    }
})


module.exports = router