import { UserModel } from '../user.model';
import { User } from "./user.interface";


const createUserIntoDB = async (user: User) => {
    const result = await UserModel.create(user);
    return result;
  };

  const getAllUsersFromDB = async () => {
    const result = await UserModel.find();
    return result;
  };

  const getSingleUserFromDB = async (id:string) => {
    const result = await UserModel.findOne({userId: id });
    return result;
  };


export const userServices= {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB
}