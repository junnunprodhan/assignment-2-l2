import { Schema, model, connect } from 'mongoose';
import { Address, FullName, Orders, User } from './user/user.interface';

const fullNameSchema= new Schema<FullName>({ 
    firstName:{type:String,trim:true, required:[true,'first name is required']},
    lastName:{type:String, trim:true, required:[true,'last name is required']}
});

const addressSchema =new Schema<Address>({
    street:{type:String, required:[true,'street name is required']},
    city:{type:String, required:[true,'city name is required']},
    country:{type:String, required:[true,'country name is required']}
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


 export const UserModel =model<User>('User',userSchema);