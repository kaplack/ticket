const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
    fileName: String,
    relativePath: String
});

const emProfileSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //type: String,
        require: true,
        ref:'User'
    },
    companyName:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    compType:{
        type: String,   
        //enum: ['Publica', 'Privada']
    },
    idNumber:{
        type: String,
        //enum: ['RUC', 'RUS']
    },
    numCol:{
        type: String,
    },
    description:{
        type: String,
        
    },
    mission:{
        type: String,
        
    },
    vision:{
        type: String,
        
    },
    ubication:{
        type: String,
        
    },
    worksNumber:{
        type: String,
        
    },
    sector:{
        type: String,
        
    },
    rating:{
        type: Number,
    },
    logo:[imgSchema],
    cover:[imgSchema],

    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    instagram: {
        type: String,
    },
    youtube: {
        type: String,
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('EmProfile', emProfileSchema)