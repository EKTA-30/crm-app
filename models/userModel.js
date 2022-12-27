const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minlength:10,
        isEmail:true,
        unique:true
    },
    createdAt:{
        type: Date,
        immutableL:true,
        default: () => new Date()
    },
    updatedAt:{
        type:Date,
        default: () => new Date()
    },
    userType:{
        type:String,
        default:"Customer"
    },
    userStatus:{
        type:String,
        default:"APPROVED"
    },
      ticketsCreated: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket"
    },
    ticketsAssigned: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket"
    }
});

module.exports = mongoose.model("User",userSchema)