import { User } from '../user.model';
import { TUser } from "./user.interface";


const createUserIntoDB = async (userData: TUser) => {
    const user = new User(userData)
    if(await user.isUserExists(userData.userId)){
        throw new Error('User already exists')
    }
  
    const userSave = await user.save();
    const result = await User.aggregate([
        {
          $project: {
            _id: 0, 
            username: 1,
            fullName: {
              $concat: ['$fullName.firstName', ' ', '$fullName.lastName']
            },
            age: 1,
            email: 1,
            address: '$address'
          }
        }
      ]);
    
    return result;
  };

  const getAllUsersFromDB = async () => {
    const allUsers = await User.find();
    const result = await User.aggregate([
        {
          $project: {
            _id: 0,
            username: 1,
            fullName: {
              $concat: ['$fullName.firstName', ' ', '$fullName.lastName'] 
            },
            age: 1,
            email: 1,
            address: '$address'
          }
        }
      ]);
    
    return result;
    
  };

  const getSingleUserFromDB = async (id:string) => {
    const result = await User.findOne({userId: id });
    return result;
  };



  const deleteSingleUserFromDB = async (id:string) => {
    const result = await User.deleteOne({userId: id });
    return result;
  };
// 
const updateUserFromDB = async (id:string, updatedData:any) => {
   
    try {
      const updatedUser = await User.findOneAndUpdate(
        { userId: id },
        updatedData,
        { upsert: true,new:true }
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  // update orders
  const updateOrderFromDB = async (id:string, updatedOrdersData:any) => {
   console.log(updatedOrdersData)
    try {
      const updateOrders = await User.findOneAndUpdate(
        { userId: id },
        updatedOrdersData,
        { upsert: true,new:true }
      );
      return updateOrders;
    } catch (error) {
      throw error;
    }
  };

  // update orders
  const getOrdersFromDB= async (id:string) => {
    const result = await User.findOne({userId: id });
    return result;
  };



export const userServices= {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteSingleUserFromDB,
    updateUserFromDB,
    updateOrderFromDB,
    getOrdersFromDB
}