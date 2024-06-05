const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please add a name'],
    },
    email:{
        type: String,
        require: [true, 'Please add an email'],
        unique: true
    },
    phone:{
        type: String,
        require: [true, 'Please add an email'],
    },
    profile:{
        type: String,
        require: [true, 'Please add an email'],
    },
    password:{
        type: String,
        require: [true, 'Please add a password'],
    },
    isAdmin:{
        type: Boolean,
        require: true,
        default: false

    },
    picture:{
        type: String,
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)