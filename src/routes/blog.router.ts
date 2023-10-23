import express from 'express';
import { blogController } from 'controllers';
import { checkToken } from 'utils';

const blogRouter = express.Router();

// blogRouter.get('/', (req, res) => res.send("blogRouter is working."));

  blogRouter.get(
    '/',
    // checkToken,
    blogController.getBlogs,
  );
  blogRouter.post(
    '/create-blog',
    // checkToken,
    blogController.createBlogValidator(),
    blogController.createBlog,
  );
  blogRouter.post(
    '/edit-blog/:id',
    // checkToken,
    blogController.createBlogValidator(),
    blogController.editBlog,
  );

  blogRouter.delete(
    '/:id',
    // checkToken,
    // blogController.createBlogValidator(),
    blogController.deleteBlog,
  );

export default blogRouter;