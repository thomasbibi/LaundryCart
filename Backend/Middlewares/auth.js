const jwt = require('jsonwebtoken')

const jwtAuth = (req,res,next)=>{
    try{
        let token = req.headers.authorization

        if(!token){
            return res.status(403).json({
                message : 'Access forbidden'
            })
        }

        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1]
        }

        const verifyUser = jwt.verify(token,process.env.JWT_SECRET)

        if(verifyUser){
            res.user = verifyUser
            next()
        }
    }

    catch(error){
        res.status(500).json({
            error : error.message 
        })
    }
}

module.exports = jwtAuth;