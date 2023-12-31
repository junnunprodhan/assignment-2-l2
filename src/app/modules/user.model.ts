import { Schema, model, connect } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser, UserMethods, UserModel } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';
import { any } from 'joi';

const fullNameSchema= new Schema<TFullName>({ 
    firstName:{type:String,trim:true, required:[true,'first name is required']},
    lastName:{type:String, trim:true, required:[true,'last name is required']}
});

const addressSchema =new Schema<TAddress>({
    street:{type:String, required:[true,'street name is required']},
    city:{type:String, required:[true,'city name is required']},
    country:{type:String, required:[true,'country name is required']}
});


const userSchema = new Schema<TUser,UserModel,UserMethods>({
    userId:{type:String, unique:true},
    username:{type:String,unique:true},
    password:{type:String},
    fullName: {type:fullNameSchema,required:true},
    age:{type:Number},
    email: { type: String, required: [true,'email is required'],unique:true },
    isActive:{type:Boolean},
    hobbies: {
        type: [String],
        default: [],
      },
    address:{type:addressSchema, required:[true,'address is required']},
    orders:{
        productName:{type:String},
        price:{type:Number},
        quantity:{type:Number}
    }
  });

//   pre hook save data

userSchema.pre('save', async function(next) {
    const user:any = this;
    user.password = await bcrypt.hash(
      user.password,
     Number(config.bcrypt_salt),
     );

     next()
  });

// post hok after save data
userSchema.post('save',function(doc:any,next){
    doc.password=""
    next()
})

userSchema.methods.isUserExists = async function (userId:string){
    const existingUser =await User.findOne({userId})
    return existingUser
}
 export const User =model<TUser,UserModel>('User',userSchema);