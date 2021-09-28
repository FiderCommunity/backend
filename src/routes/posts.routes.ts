import got from 'got';
import { Router } from 'express';
import { getCustomRepository } from "typeorm";

import Post from '../models/Post';
import ProjectsRepository from '../repositories/ProjectsRepository';


const postsRouter = Router();

postsRouter.get('/', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);
  let projects = await projectsRepository.find();

  let responsePosts: Post[] = []

  await Promise.all(projects.map(async (project) => {
    let projectsPosts: JSON[] = await got.get(project.url + "api/v1/posts/").json();

    projectsPosts.forEach(postJSON => {
      let newPost: Post = Object.setPrototypeOf(postJSON, Post.prototype)
      newPost.projectName = project.name
      newPost.postURL = project.url + 'posts/' + newPost.number

      responsePosts.push(newPost)
    })
  }));

  return response.json(responsePosts);
});

export default postsRouter;
