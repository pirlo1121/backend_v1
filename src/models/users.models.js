import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must have at least 3 characters']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
        minLength: [3, 'lastName must have at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/ , 'Invalid password'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});




export const usersModel = mongoose.model('users', userSchema);