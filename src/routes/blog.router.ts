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

export default blogRouter;