const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registerUser = asyncHandler( async(req, res) => {
    const{name, email, password} = req.body
    if (!name || !email || !password){
        res.status(400)
        throw new Error ('Por favor teclea todos los datos')
    }
    //Verificamos si ese usuario existe
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error ('Ese usuario ya está resgistrado')
    }

    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Creamos al usuario en la base de datos
    const user = await User.create({
        name, 
        email, 
        password: hashPassword
    })

    if(user){
        res.status(200).jason({
            _id : user._id,
            name : user.name,
            email : user.email
        })
    }else{
        res.status(400)
        throw new Error('No se puede crear el usuario, favor de verificar sus datos')
    }
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    // verificar email y pasword
    const user = await User.findOnde({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }

})

//generamos el jwt
const generateToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expireIn: '60m'
    })
}

const getUserData = asyncHandler(async(req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    getUserData
}