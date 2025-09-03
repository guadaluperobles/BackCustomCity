import mongoose from "mongoose";

let ratesSchema = new mongoose.Schema({
  name:{type:String},
  date:{type:Date},
  amount:{type:Number},
  delete: {type: Date, default: null}
}, {
  timestamps: true
})

export default mongoose.model('Rate', ratesSchema)