import { usersModel } from "../models/users.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "../config/env.config.js";
import mongoose from "mongoose";

export async function getUserById(req, res) {

    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                ok: false,
                msg: 'ID NOT VALID'
            });
        }

        const userFound = await usersModel.findById(id);

        if( !userFound  ){
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'User found',
            data: userFound
        })


        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
    
}

export async function getUsers(req, res) {

    try {
        const users = await usersModel.find();

        if (users.length == 0) {

            return res.status(404).json({
                ok: false,
                msg: 'Users Not found'
            });

        }

        return res.status(200).json({
            ok: true,
            msg: 'Users found',
            data: users
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

export async function createUsers(req, res) {

    try {

        const data = req.body

        // nadie se puede registrar como admin desde el formulario
        data.role = 'user';

        // validar que el email no este registrado
        const emailExists = await usersModel.findOne({ email: data.email });
        if (emailExists) {
            return res.status(409).json({
                ok: false,
                msg: 'Email already registered'
            })
        }

        const newUser = await usersModel.create(data);
        newUser.password = undefined

        return res.status(201).json({
            ok: true,
            msg: 'user created',
            data: newUser
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }

}

export async function updateUser(req, res) {
    try {

        const id = req.params.id
        const data = req.body;

        const user = await usersModel.findByIdAndUpdate(id , data , { new: true , runValidators: true })

        if( !user ){
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'user updated',
            data: user
        })



    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}



export async function login(req, res) {

    try {
        // email, password
        const { email , password } = req.body;

        const userFound = await usersModel.findOne({email: email}).select('+password')
    
        if(!userFound){
            return res.status(401).json({
                ok: false,
                msg: 'Invalid credentials'
            })
        };

        const isMatch = await bcrypt.compare(password , userFound.password);

        if (!isMatch) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid credentials'
            })
        } 

        userFound.password = undefined;

        // crear token 
        const token = jwt.sign({userFound} , env.jwt , { expiresIn: '1h' });

        // crear un cookie y guardar el token

        // httpOnly: el javascript del navegador no puede leer la cookie (mas seguro)
        res.cookie('token', token, { httpOnly: true });

        // devolvemos el usuario (sin password) para que el front sepa quien entro y su rol
        return res.status(200).json({
            ok: true,
            msg: 'Login successful',
            data: userFound
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

export async function logout(req,res) {
    try {
        res.clearCookie('token');
        return res.status(200).json({ ok: true, msg: 'logged out' });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}
