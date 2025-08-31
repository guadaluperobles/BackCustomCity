import mongoose from "mongoose";

export const coneccionBD = async () => {
  try{
    await  mongoose.connect("mongodb://localhost/customCity");
    console.log("Coneccion correctamente.")
  }catch (error){
    console.log(error)
  }
}