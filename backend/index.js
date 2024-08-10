import express from 'express'
import connectDB from './db.js';
import authRoute from './routes/auth.route.js'
const app = express();
connectDB();
app.use(express.json());
app.use('/api/v1/auth',authRoute)
app.listen(3000,()=>{
    console.log(`server is running on Port 3000 !`);
    
})