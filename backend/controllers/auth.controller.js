import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
export const signUp = async (req,res)=>{
    const{username,email,password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({msg:"All field required"})
    }

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

    
}