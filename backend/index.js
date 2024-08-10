import express from 'express'
import connectDB from './db.js';
import authRoute from './routes/auth.route.js'
const app = express();
connectDB();
app.use(express.json());
app.use('/api/v1/auth',authRoute)


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