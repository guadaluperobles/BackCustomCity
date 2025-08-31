import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  userName: {
    type:String,
    required: true,
    trim: true,
    unique:true
  },
  email:{
    type:String,
    required: true,
    trim: true,
    unique:true
  },
  password:{type:String},
}, {
  timestamps: true
})

export default mongoose.model('User', UserSchema)