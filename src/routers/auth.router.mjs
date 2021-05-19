import { Router } from 'express';
import { verifyUser } from '../database_models/db.mjs';
import { authenticate } from '../middlewares/auth.middleware.mjs'

// GraphQL

export function createRouter() {
    const router = Router();
    router.post('/login', authenticate, async (request, response) => {
        try {
            return response
                    .status(200)
                    .json(request.user)

        } catch (error) {
            response
                .status(error.status || 500)
                .json({ status: error.message })

        }
    });
    return router;
}
