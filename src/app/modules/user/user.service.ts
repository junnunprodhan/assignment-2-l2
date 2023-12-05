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
    const userData = await User.findOne({userId: id });
    const result = {
      userId: userData?.userId,
      username: userData?.username,
      fullName: userData?.fullName,
      age: userData?.age,
      email: userData?.email,
      isActive: userData?.isActive,
      hobbies: userData?.hobbies,
      address: userData?.address,
    };

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
    try {
    
      const updateOrders = await User.findOneAndUpdate(
        { userId: id },
        updatedOrdersData,
        {new:true,upsert:true }
      );
      console.log(updatedOrdersData)
      return updateOrders;
    } catch (error) {
      throw error;
    }
  };

  // get orders start
  const getOrdersFromDB= async (id:string) => {
    const result = await User.findOne({userId: id });
    return result;
  };

  // get orders total
const getOrdersTotalFromDB = async (id:string) => {
  try {
      const result = await User.findOne({ userId: id });
      const data:any= result?.orders;
      
      if ( !data || !Array.isArray(data)) {
          throw new Error('No orders found or orders is not an array');
      }

      const totalPrice =data.reduce((total, order) => {
          return total + (order.price * order.quantity);
      }, 0);

      return totalPrice;
  } catch (error:any) {
      console.error("Error:", error.message);
      return 0; 
  }
};


export const userServices= {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteSingleUserFromDB,
    updateUserFromDB,
    updateOrderFromDB,
    getOrdersFromDB,
    getOrdersTotalFromDB
}