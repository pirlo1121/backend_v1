import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
// M V P  
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [3, 'Name must have at least 3 characters']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
        trim: true,
        minLength: [3, 'lastName must have at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
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


userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// Encriptar la contraseña tambien al actualizar (findByIdAndUpdate)
userSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate();
    if (!update || !update.password) return;

    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
});





export const usersModel = mongoose.model('users', userSchema);