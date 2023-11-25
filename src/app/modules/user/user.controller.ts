import { Request, Response } from 'express';
import { userServices } from './user.service';
import Joi from 'joi';
import userValidationSchema from './user.validator';



const createUser = async (req: Request, res: Response) => {
  try {
    // using joi validation

   
      

    // end joi
    const { user: userData } = req.body;
    const {error,value}=userValidationSchema.validate(userData);
    const result = await userServices.createUserIntoDB(value);
// using aggregate


// aggregate end
 
    res.status(200).json({
      success: true,
      message: 'User is created succesfully',
      data: result,
// fill filtering

// fill filtering end

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

export const UserControllers={
    createUser,
    getUsers,
    getSingleUser,
    deleteSingleUser
}