import { Schema, model, connect } from 'mongoose';
import { Address, FullName, Orders, User } from './user/user.interface';

const fullNameSchema= new Schema<FullName>({ 
    firstName:{type:String, required:true},
    lastName:{type:String, required:true}
});

const addressSchema =new Schema<Address>({
    street:{type:String, required:true},
    city:{type:String, required:true},
    country:{type:String, required:true}
});

// const ordersSchema =new Schema<Orders>({
//     productName:{type:String, required:true},
//     price:{type:Number, required:true},
//     quantity:{type:Number,required:true}
// })

const userSchema = new Schema<User>({
    userId:{type:Number, unique:true},
    username:{type:String,unique:true},
    password:{type:String},
    fullName: fullNameSchema,
    age:{type:Number},
    email: { type: String, required: true,unique:true },
    isActive:{type:Boolean},
    hobbies: {
        type: [String],
        default: [],
      },
    address:addressSchema,
    orders:{
        productName:{type:String},
        price:{type:Number},
        quantity:{type:Number}
    }
  });


 export const UserModel =model<User>('User',userSchema);