import jwt from 'jsonwebtoken';
import { verifyUser } from '../database_models/db.mjs';


export async function authenticate(request, response, next) {
    const CLAVE = process.env.JWT_KEY;
    const username = request.body.username;
    const password = request.body.password;
    const user = await verifyUser (username, password);
    if (user) {

        // Inyectar el token
        const token = jwt.sign({
            ...user,
            password: undefined
        }, CLAVE);
        request.user = {
            ...user,
            password: undefined,
            token: token
        }

        next();
    } else {
        response
            .status(403)
            .json({
                status: 'fail',
                message: 'invalid user or password.'
            });
    }
}

export async function validateToken(request, response, next) {
    const CLAVE = process.env.JWT_KEY;
    const authHeader = request.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    try {
        if (jwt.verify(token, CLAVE)) {
            next();
        } else {
            response
                .status(403)
                .json({
                    status: 'fail',
                    message: 'invalid user token.'
                });
        }
    } catch (error) {
        response
            .status(403)
            .json({
                status: 'fail',
                message: 'invalid user token.'
            });
    }
}