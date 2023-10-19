import { DBConnect, Logger } from "../utils";
import { MESSAGES } from "../consts";

const databaseSetup = async (next: () => void) => {
  try{
    await DBConnect.getConnection();
    next();
    Logger.log(MESSAGES.DATABASE_CONNECTION_SUCCESS);

  } catch (error) {
    Logger.log(error);
    Logger.error(MESSAGES.DATABASE_CONNECTION_FAILURE);
  }
}

export default databaseSetup;