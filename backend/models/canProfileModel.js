const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    fileName: String,
    relativePath: String
  });

const canProfileSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //type: String,
        require: true,
        ref:'User'
    },
    name:{
        type: String,
    },
    lastName:{
        type: String,
    },
    tipoDoc:{
        type: String,
    },
    doc:{
        type: String,
    },
    phone:{
        type: String,
        require: true
    },
    lang:{
        type: [String]
    },
    nationality:{
        type: String
    },
    genre:{
        type: String,
        
    },
    age:{
        type: Date,
        
    },
    disability:{
        type: String,
        
    },
    diagnosis:{
        type: String,
        
    },
    country:{
        type: String
    },
    city:{
        type: String
    },
    postalCode:{
        type: String
    },
    address:{
        type: String
    },
    nivEduc:{
        type: String,
        
    },
    experience:{
        type: String,
    },
    professionalProfile:{
        type: String,
    },
    resume:[resumeSchema]

    
}, 
{
    timestamps: true
})

module.exports = mongoose.model('CanProfile', canProfileSchema)