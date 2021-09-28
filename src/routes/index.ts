import { Router } from 'express';

import usersRouter from './users.routes';
import postsRouter from './posts.routes';
import sessionsRouter from './sessions.routes';
import projectsRouter from './projects.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use("/users", usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/posts', postsRouter);

export default routes;
