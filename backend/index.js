import express from 'express'
import connectDB from './db.js';

const app = express();
connectDB();
app.listen(3000,()=>{
    console.log(`server is running on Port 3000 !`);
    
})