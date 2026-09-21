import { userModel } from "../models/users.models.js";

export async function getUsers(req, res) {
    try {

        const users = await userModel.find();

        if (users.length == 0) {
            return res.json({
                ok: false,
                msg: 'Users not founded'
            })}

        return res.json({
            ok: true,
            msg: 'Users founded',
            data: users
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}

export async function createUser(req, res) {
    try {
        const data = req.body;

        const user = await userModel.create(data);
        user.password = undefined;

        res.json({
            ok: true,
            msg: 'User created',
            data: user
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error',
            error: error.message
        })

    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id;

        const user = await userModel.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: 'User deleted',
            data: user
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}

export async function updateUser(req, res) {
    try {
        // capturar el id
        const id = req.params.id;
        const data = req.body;

        const user = await userModel.findByIdAndUpdate(id, data, {new: true});

        res.json({
            ok: true,
            msg: 'User updated',
            data: user
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}
