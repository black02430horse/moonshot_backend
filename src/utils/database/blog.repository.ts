import { BlogEntity } from "entities";
import { DBConnect } from "utils/dbConnector";

export const getBlogRepository = async () => {
  const connection = await DBConnect.getConnection();
  return connection.getRepository(BlogEntity);
}