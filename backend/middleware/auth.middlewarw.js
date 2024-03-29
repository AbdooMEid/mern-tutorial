const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');




const prodect = asyncHandler( async (req,res,next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try {
            // Get token from headers 
          token = req.headers.authorization.split(' ')[1]
          
          // verify Token 

          const decoded = jwt.verify(token , process.env.JWT_SECRET)

          //Get User From The token

          req.user = await User.findById(decoded.id).select('-password')

          next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
            
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized , not token')
    }
})

module.exports = {prodect}