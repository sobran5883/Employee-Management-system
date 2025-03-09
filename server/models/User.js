import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin", "customer"],
        required:true
    },
    profileImage:{
        type:String,
    },
    loginCount:{
        type: Number,
        default:0
    },
    status: { type: String, enum: ["working", "on leave"], default: "on leave" },
    loginHistory: [
        {
          date: { type: Date, required: true },
          count: { type: Number, default: 0 },
        },
      ],
    createAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
},{timestamps: true})

const User = mongoose.model("User", userSchema)
export default User