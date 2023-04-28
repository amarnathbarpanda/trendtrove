import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    shippingAddress:{
        street: String,
        city: String,
        state: String,
        country: String,
        pinCode: String
    },
    role:{
        type: String,
        default: 'user',
    }
},{
    timestamps: true
});



const User = mongoose.model("User", userSchema);
export default User;