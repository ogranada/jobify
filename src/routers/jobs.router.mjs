//import { validateToken } from '../middlewares/auth.middleware.mjs;


const creaLibro = async (request, response) => {
    const data = await createBook(
        request.body
    );
    response.json(data);
};