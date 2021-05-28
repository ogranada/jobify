import { Router } from 'express';
import { createJob } from '../database_models/db.mjs';
import { getJobs } from '../database_models/db.mjs';

const creaLibro = async (request, response) => {
    const data = await createBook(
        request.body
    );
    response.json(data);
};


export function createRouter () {
    const router = new Router();
    
    router.post('/', async (request, response) => {
        const job = await createJob(request.body)
        response
        .status(200)
        .json({
            status: 'saved',
            data: job
        })
        ;
    })
    
    router.get('/', async (request, response) => {
        const jobs = await getJobs();
        const processed = jobs.map(job => ({
            ...job.toJSON(),
            locations: job.locations.split(',').map(x => x.trim())
        }))
        response
            .status(200)
            .json(processed);
    })
  
    return router;
}
