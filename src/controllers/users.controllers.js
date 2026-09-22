import { usersModel } from "../models/users.models.js";




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