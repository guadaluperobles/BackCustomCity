import mongoose from "mongoose";

let invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type:String,
    required: true,
    trim: true,
    unique:true
  },
  clientName:{type:String},
  date:{type:Date},
  status:{type:Boolean},
  amount:{type:Number},
  delete: {type: Date, default: null}
}, {
  timestamps: true
})

export default mongoose.model('Invoice', invoiceSchema)