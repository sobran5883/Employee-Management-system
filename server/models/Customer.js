import mongoose from "mongoose";
import { Schema } from "mongoose";

const customerSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    customerId:{
        type: String, 
        required: true,
        unique: true,
    },
    gender:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
})

const Customer = mongoose.model("Customer", customerSchema)
export default Customer