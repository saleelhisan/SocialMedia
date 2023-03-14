import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    bio:{
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    followers: [{
        type:String,
    }],
    following: [{
        type:String,
    }],
    profilePic: {
        type: String,
    },
    coverPic: {
        type: String,
    }
})
const User = mongoose.model("User", userSchema);
export default User