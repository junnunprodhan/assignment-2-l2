import { User } from '../user.model';
import { TUser } from "./user.interface";


const createUserIntoDB = async (userData: TUser) => {
    // const result = await UserModel.create(user);
    const user = new User(userData)
    if(await user.isUserExists(userData.userId)){
        throw new Error('User already exists')
    }
    // user.isUserExists
    const result = await user.save()
    return result;
  };

  const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result;
  };

  const getSingleUserFromDB = async (id:string) => {
    const result = await User.findOne({userId: id });
    return result;
  };


export const userServices= {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB
}