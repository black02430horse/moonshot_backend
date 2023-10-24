import { BlogEntity, UserEntity } from 'entities';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { blogService, userService } from 'services';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import { AuthRequest, BlogRequest } from 'types';
import { Logger } from 'utils';
import { UploadedFile } from 'express-fileupload'
import { CustomError } from 'errors';
import { v1 as uuidv1 } from 'uuid';

export const getBlogsValidator = () => {
  return [
    // body('userEmail').notEmpty().withMessage('User email is required.').isEmail().withMessage('Email type is invalid.'),
  ];
}

export const createBlogValidator = () => {
  return [
    // body('img').notEmpty().withMessage('Image is required.'),
    body('creator').notEmpty().withMessage('Creator is required.'),
    body('title').notEmpty().withMessage('Title is required.'),
    body('content').notEmpty().withMessage('Content is required.'),
  ];
}

type Params = any;
type ResBody = unknown;
type ReqBody = {
};
type ReqQuery = unknown;

export const getBlogsHandler = async (
  req: BlogRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {

  // const user: UserEntity = req.user;

  const blogs: BlogEntity[] = await blogService.getBlogs();

  // Logger.log(blogs);

  res.status(httpStatus.OK).json({blogs: blogs});
}

export const getFileInfo = (file: UploadedFile | UploadedFile[]) => {
  if(!file) return {image: null, fileName: null, filePath: null};
  const image = file as UploadedFile? file: file[0];
  const fileName = uuidv1() + image.name.substring(image.name.lastIndexOf('.'), image.name.length);
  const filePath = "../moonshot/public/storage/image/" + fileName;
  return {image, fileName, filePath};
}

export const createBlogHandler = async (
  req: BlogRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {

  const file = req.files.file;
  // console.log(file);
  const {image, fileName, filePath} = getFileInfo(file);
  
  image.mv(filePath, async (err) => {
    if(err) throw new CustomError(err);
    const newBlog: BlogEntity = await blogService.createBlog(req.body, fileName);
    res.status(httpStatus.OK).json({blog:newBlog});
  })

}

export const editBlogHandler = async (
  req: BlogRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {

  const file = req.files?.file;

  if(!file) {
    const newBlog:BlogEntity = await blogService.editBlog({blog: req.body, id: req.params.id});
    res.status(httpStatus.OK).json({blog:newBlog});
  }

  else {
    const {image, fileName, filePath} = getFileInfo(file);
    console.log(fileName);
    image.mv(filePath, async (err) => {
      if(err) throw new CustomError(err);
      const newBlog: BlogEntity = await blogService.editBlog({blog:{...req.body, img: fileName}, id:req.params.id});
      res.status(httpStatus.OK).json({blog:newBlog});
    })
  }

  

  // Logger.log(newBlog);

}

export const deleteBlogHandler = async (
  req: BlogRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {

    console.log("delete request", req.params.id);

  const newBlog:BlogEntity = await blogService.deleteBlog({id: req.params.id});
  res.status(httpStatus.OK).json({id: req.params.id});
  // Logger.log(newBlog);

}

export const getBlogs = errorHandlerWrapper(getBlogsHandler);
export const createBlog = errorHandlerWrapper(createBlogHandler);
export const editBlog = errorHandlerWrapper(editBlogHandler);
export const deleteBlog = errorHandlerWrapper(deleteBlogHandler);