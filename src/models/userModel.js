let mongoose = require('mongoose');

mongoose.set('strictQuery', true);

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,      
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone_no : {
        type: Number,
        required: true,
        trim: true
    },
    profession : {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);