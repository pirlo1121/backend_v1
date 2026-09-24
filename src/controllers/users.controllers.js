import { usersModel } from "../models/users.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "../config/env.config.js";

export async function getUserById(req, res) {

    try {
        const id = req.params.id;

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
            data: user
        })


        
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error',
            error: error.message
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
            msg: 'Server error',
            error: error.message
        })
    }

}

export async function createUsers(req, res) {

    try {

        const data = req.body
        // tener la contraseña

        // generar el SALT
        const SALT = await bcrypt.genSalt(10)

        // generar el HASH
        const hash = await bcrypt.hash(data.password , SALT);

        data.password = hash
        console.log(data.password)
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
            msg: 'Server error',
            error: error.message
        })
    }

}

export async function updateUser(req, res) {
    try {

        const id = req.params.id
        const data = req.body;

        const user = await usersModel.findByIdAndUpdate(id , data , { new: true , runValidators: true })

        return res.status(200).json({
            ok: true,
            msg: 'user updated',
            data: user
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error',
            error: error.message
        })
    }
}


export async function login(req, res) {

    try {
        // email, password
        const { email , password } = req.body;
        // verificar el correo en la DB;

        const userFound = await usersModel.findOne({email: email}).select('+password')
    
        if(!userFound){
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        };

        const isMatch = await bcrypt.compare(password , userFound.password);

        if (!isMatch) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid Password'
            })
        } 

        userFound.password = undefined;

        // crear token 
        const token = jwt.sign({userFound} , env.jwt )


        res.send(token)


        // crear un cookie y guardar el token


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error',
            error: error.message
        })
    }
}