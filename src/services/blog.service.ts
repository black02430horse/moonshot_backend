import { BlogEntity } from "entities";
import { getBlogRepository } from "utils";

export const getBlogs = async (): Promise<BlogEntity[] | null> => {
  const blogRepository = await getBlogRepository();
  
  // console.log("asfasdfasdfasdf");

  const blogs: BlogEntity[] = await blogRepository.findBy({});

  // console.log('blogs:  ', blogs);

  return blogs;
}

export const createBlog = async (blog, fileName): Promise<BlogEntity> => {
  const blogRepository = await getBlogRepository();
  
  // console.log("asfasdfasdfasdf");
  const newBlog = new BlogEntity();
  newBlog.buttons = blog.buttons;
  newBlog.creator = blog.creator;
  newBlog.title = blog.title;
  newBlog.img = fileName;
  newBlog.content = blog.content;


   await blogRepository.save(newBlog);

   return newBlog;

  // console.log('blogs:  ', blogs);

  return;
}

export const editBlog = async ({blog, id}): Promise<BlogEntity> => {
  const blogRepository = await getBlogRepository();

  const preBlog = await blogRepository.findOneBy({id: id});
  preBlog.buttons = blog.buttons;
  preBlog.creator = blog.creator;
  preBlog.title = blog.title;
  preBlog.img = blog.img;
  preBlog.content = blog.content;
  await blogRepository.save(preBlog);

  // console.log('blogs:  ', preBlog);

  return preBlog;
}

export const deleteBlog = async ({id}): Promise<BlogEntity> => {
  const blogRepository = await getBlogRepository();


  const preBlog = await blogRepository.findOneBy({id: id});
  preBlog.deletedAt = new Date();
  await blogRepository.save(preBlog);

  // console.log('blogs:  ', preBlog);

  return preBlog;
}

