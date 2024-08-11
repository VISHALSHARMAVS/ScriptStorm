import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'

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
