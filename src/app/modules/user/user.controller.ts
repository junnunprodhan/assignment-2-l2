import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validator';





const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const {error,value}=userValidationSchema.validate(userData);
    const result = await userServices.createUserIntoDB(value);
 
    res.status(200).json({
      success: true,
      message: 'User is created succesfully',
      data: result,

    });
  } catch (err:any) {
    res.status(404).json({
        success: false,
        message: err.message || 'User not found',
        error: err
      });
  }
};

const getUsers = async (req: Request, res: Response) => {
    try {
      const result = await userServices.getAllUsersFromDB();
  
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };


  const getSingleUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      const result = await userServices.getSingleUserFromDB(userId);
  
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } catch (err:any) {
        res.status(404).json({
            success: false,
            message: err.message || 'User not found',
            error: err,
          });
    }
  };

//   delete user
const deleteSingleUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      const result = await userServices.deleteSingleUserFromDB(userId);
  
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
    } catch (err:any) {
        res.status(404).json({
            success: false,
            message: err.message || 'User not found',
            error: err,
          });
    }
  };
// update user
const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const updatedData = req.body;
    try {
      const updatedUser = await userServices.updateUserFromDB(userId, updatedData);
    
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: updatedUser,
        
      });
    } catch (error:any) {
      res.status(404).json({
        success: false,
        message: 'Error updating user',
        error: error.message,
      });
    }

  };


// update user end

const updateOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updatedOrdersData = req.body
  
  try {
    const updatedOrders = await userServices.updateOrderFromDB(userId, updatedOrdersData);
  
    res.status(200).json({
      success: true,
      message: 'Order created successfully!!',
      data: updatedOrders,
      
    });
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }

};

// get orders

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.getSingleUserFromDB(userId);


    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!!',
      data: result?.orders,
    });
  } catch (err:any) {
      res.status(404).json({
          success: false,
          message: err.message || 'Order not found',
          error: err,
        });
  }
};


export const UserControllers={
    createUser,
    getUsers,
    getSingleUser,
    deleteSingleUser,
    updateUser,
    updateOrders,
    getOrders
    
}