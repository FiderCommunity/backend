import { Router } from 'express';
import { getCustomRepository } from "typeorm";

import ProjectsRepository from '../repositories/ProjectsRepository';
import CreateProjectService from '../services/CreateProjectService';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';


const projectsRouter = Router();


projectsRouter.get('/', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);
  const projects = await projectsRepository.find();

  return response.json(projects);
});



projectsRouter.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const { url, name, description, user_id, logo_url} = request.body;
    
    const createProject = new CreateProjectService();
    const project = await createProject.execute({ url, logo_url, name, description, user_id });

    return response.json(project);
  }
  catch (e) {
    const { message } = e as Error
    return response.status(400).json({ message: message });
  }
});


projectsRouter.get('/my-projects', ensureAuthenticated, async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);

  const id = request.user.id
  const projects = await projectsRepository.find({ where: { user_id: id } });

  return response.json(projects);
});


projectsRouter.delete('/', ensureAuthenticated, async (request, response) => {
  try {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const id = request.query.id as string;
    const result = await projectsRepository.delete(id)

    if(result.affected == 0) throw new Error('Invalid ID.');

    return response.status(204).json({});
  }
  catch (e) {
    const { message } = e as Error
    return response.status(400).json({ message: message });
  }
});




export default projectsRouter;
