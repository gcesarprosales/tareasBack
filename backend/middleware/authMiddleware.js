const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require ('../models/usersModel')


const protect = asynHandler(async(req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1]
            //verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //Obtener el ID del token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch(error){
            console.log(error)
            res.status(401)
            throw new Error ('Sin auterización')
        }
    }

    if(!token){
        res.status(401)
        throw new Error ('Sin auterización, no se proporcionó ningún token')
    }
})

module.export = {protect}