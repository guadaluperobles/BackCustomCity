import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from "../libs/jwt.js";

const index = async (req, res) => {
  const {id} = req.query;
  try{
    if(id && id.length > 23){
      const model = await User.findById(id.toString());
      if(!model) res.status(400).json({message:"Not found"});
      res.json(model);
    }
    const models = await User.find({ delete: { $eq: null } });
    res.json({models:models});
  } catch (err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const save = async (req, res) => {
  const {id, userName, email, password} = req.body;

  try{
    const model = User.findOne({_id:id})

    if(!id){
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        userName,
        email,
        password:passwordHash,
      });
      const response = await newUser.save()
      res.send(response)
    }else {
      return "";
    }


  }catch (error){
    console.log(error)
    res.status(500).json({message:error.message})
  }
};

const remove = (req, res) => res.send("Deleting");

const login = async (req, res) => {

  const {email, password} = req.body;
  try{

    const found = await User.findOne({email})

    if(!found) return res.status(400).json({message:"User not found"})

    const match = await bcrypt.compare(password,found.password)
    if(!match) return res.status(400).json({message:"Invalid credentials"})

    const token = await createAccessToken({id:found._id})
    res.cookie(token);
    res.json({
      id:found._id,
      username:found.userName,
      email:found.email
    })
  }catch (error){
    console.log(error)
    res.status(500).json({message:error.message})
  }
}

const logout = (req, res) => {
  res.cookie({"token": ""})
}

export {index, save, remove, login, logout};