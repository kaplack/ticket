const mongoose = require('mongoose')

const workSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //type: String,
        require: true,
        ref:'User'
    },
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    workFunctions:{
        type: String,
        require: true,
    },
    workRequire:{
        type: String,
        require: true,
    },
    workPay:{
        type: Number,
    },
    workWay:{
        type: String,
        require: true,
    },
    workPlace:{
        type: String,
    },
    actTime:{
        type: Date,
        require: true,
    },
    workStatus:{
        type: String,
        require: true,
        enum: ['borrador','publicado', 'evaluando', 'resultado']
    },
    active:{
        type: Boolean,
    },
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Works', workSchema)