import express from 'express'
import connectDB from './db.js';
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors({origin:'http://localhost:5173',credentials:true}));
connectDB();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',userRoute)


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000,()=>{
    console.log(`server is running on Port 3000 !`);
    
})