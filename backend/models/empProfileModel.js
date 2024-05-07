const mongoose = require('mongoose')

const emProfileSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //type: String,
        require: true,
        ref:'User'
    },
    picture:{
        type: String
    },
    compType:{
        type: String,
        require: true,
        enum: ['Publica', 'Privada']
    },
    idType:{
        type: String,
        require: true,
        enum: ['RUC', 'RUS']
    },
    idNumber:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true
    },
    mission:{
        type: String,
        require: true
    },
    vision:{
        type: String,
        require: true
    },
    ubication:{
        type: String,
        require: true
    },
    worksNumber:{
        type: String,
        require: true
    },
    sector:{
        type: String,
        require: true
    },
    rating:{
        type: Number,
    },
    
}, 
{
    timestamps: true
})

module.exports = mongoose.model('EmProfile', emProfileSchema)