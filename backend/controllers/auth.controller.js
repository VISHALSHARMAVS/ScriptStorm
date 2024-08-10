import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/errorHandler.js";
export const signUp = async (req,res,next)=>{
    const{username,email,password} = req.body;

    if (!username || !email || !password) {
        next(errorHandler(400,'All fields are required'))
    }

    try {
        const hashedPassword = bcrypt.hashSync(password,10);
    
        const user = await User.create({username,email,password:hashedPassword});
    
        if (!user) {
            return res.status(400).json({
                msg:"something went wrong "
            })
        }
        res.status(200).json({
            msg:"User registered successfully"
        })
    
        
    } catch (error) {
        next(error);
    }
}