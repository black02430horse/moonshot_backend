import { BlogEntity } from "entities";
import { getBlogRepository } from "utils";

export const getBlogs = async (): Promise<BlogEntity[] | null> => {
  const blogRepository = await getBlogRepository();
  
  // console.log("asfasdfasdfasdf");

  const blogs: BlogEntity[] = await blogRepository.findBy({});

  // console.log('blogs:  ', blogs);

  return blogs;
}
