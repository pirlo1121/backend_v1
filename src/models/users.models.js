import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nombre obligatorio"],
    minlength: [3, "Mínimo 3 caracteres"],
    maxlength: [50, "Máximo 50 caracteres"],
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Email inválido"]
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    select: false
  },

  age: {
    type: Number,
    min: 18,
    max: 100
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});


export const userModel = mongoose.model('users', userSchema);
