import { Request, Response } from 'express';
import { userServices } from './user.service';
// import { StudentServices } from './student.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers={
    createUser
}