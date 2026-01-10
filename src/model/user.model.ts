import mongoose from "mongoose";

interface IUser{
    id?:mongoose.Types.ObjectId;

    name:string;
    email:string;
    password?:string;
    image?:string;
    phone?:string;
    role: "user" | "vender" | "admin"

    // for vender
    shopName?:string;
    shopAddress?:string;
    gstNumber?:string;
    isApproved?:boolean;
    verificationStatus : "pending" | "approved" | "rejected"
    requestedAt:Date;
    approvedAt:Date;
    rejectedReason?:string;

    vendorProducts?:mongoose.Types.ObjectId[];
    orders?:mongoose.Types.ObjectId[];

    cart?:{
        product:mongoose.Types.ObjectId;
        quantity:Number
    }[];

    createdAt?:Date;
    updatedAt?:Date;


}

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        enum:["user","vender","admin"],
        default:"user"
    },

    shopName:{
        type:String
    },
    shopAddress:{
        type:String
    },
    gstNumber:{
        type:Number
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    verificationStatus:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
   approvedAt:{
        type:Date
   },
   requestedAt:{
    type:Date
   },
   rejectedReason:{
    type:String
   },
   vendorProducts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product"
   }],
   orders:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"orders"
   }],
   cart:[
       {
          product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"orders"
          },
          quantity:{
            type:Number,
            default:1
          }
       }
   ]


},{timestemps:true})

const User = mongoose.model?.user || mongoose.model<IUser>("user",userSchema)
export default User
