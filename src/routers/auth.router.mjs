// import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.mjs'


server.post('/api/v1/auth/', (request, response) => {
    const index = usuarios.findIndex(usuario => (usuario.userName === request.body.userName) && (usuario.password === request.body.password));

    if (index !== -1) {
        return response
            .status(200)
            .json({ status: "OK" })
    };

    response
        .status(401)
        .json({ status: "NO-OK" })

});