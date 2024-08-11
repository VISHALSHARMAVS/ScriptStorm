import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import errorHandler from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        if (!user) {
            return res.status(500).json({ message: 'User registration failed' });
        }

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        next(error);
    }
};
export const signIn = async(req,res,next)=>{
    const { username, password } = req.body;

    if (!username || !password) {
        return next(errorHandler(400, 'All fields are required'));
    }
    try {
        const validUser = await User.findOne({username})
        if (!validUser) {
           return next(errorHandler(404,'user not found'))
        }
        const validPassword = bcrypt.compareSync(password ,validUser.password)
        if (!validPassword) {
           return next(errorHandler(404,'Invalid Password'))
            
        }
        const token = jwt.sign({
            id:validUser._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )
        res.status(200).cookie('token',token,{
            httpOnly:true,
        }).json({message:"User Loggedin successfully"})
    } catch (error) {
        next(error)
    }
}
