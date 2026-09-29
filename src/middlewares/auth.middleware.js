import jwt from 'jsonwebtoken';
import { env } from '../config/env.config.js';


export function auth(req, res, next){
    try {
        const { token } = req.cookies;

        // validar si está el token
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'Token is required'
            })
        }
        // validar si es correcto

        const tokenDecode = jwt.verify(token , env.jwt);

        // guardar el usuario en la request
        req.user = tokenDecode.userFound;

        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }
}



