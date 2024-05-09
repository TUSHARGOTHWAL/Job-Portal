const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength:[3, 'Name must be at least 3 characters long'],
        maxlength:[50, 'Name must be at most 50 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true

    },
    phone:{
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,

    },
    role: {
        type: String,
        enum: ['Job Seeker', 'employer'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Encrypt password using bcrypt\

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
} 


//Return JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

module.exports = mongoose.model('User', userSchema);