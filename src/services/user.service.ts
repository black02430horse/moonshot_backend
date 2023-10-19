import { UserEntity } from "entities";
import { getUserRepository } from "utils";

export const getUserFromEmail = async (email: string): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  
  const userInfo: UserEntity | null = await userRepository.findOneBy({
    userEmail: email
  });

  return userInfo;
}

export const createUser = async (
  data: Pick<UserEntity, 'userName' | 'userEmail' | 'userPassword'>
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();

  const newUser: UserEntity = new UserEntity();

  newUser.userName = data.userName;
  newUser.userEmail = data.userEmail;
  newUser.userPassword = data.userPassword;

  await userRepository.save(newUser);

  return newUser;

}