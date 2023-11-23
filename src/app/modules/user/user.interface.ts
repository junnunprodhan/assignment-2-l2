import { Schema, model, connect } from 'mongoose';

export type FullName={
    "firstName": "string",
    "lastName": "string",
}
export type Address={
    "street": "string",
    "city": "string",
    "country": "string"
}
export type Orders={
    "productName":"string",
    "price":"number",
    "quantity":"number"
}

export type  User={
    "userId"?: "string",
    "username": "string",
    "password": "string",
    "fullName": FullName,
    "age"?: "number",
    "email": "string",
    "isActive"?: "boolean",
    "hobbies": [
        "string",
        "string",
    ],
    "address":Address,
    "orders":Orders  
}