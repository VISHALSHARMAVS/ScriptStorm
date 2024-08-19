import express from 'express'
import connectDB from './db.js';
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import postRoute from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js';
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();
const corsOptions = {
    origin: 'https://scriptstorm.onrender.com/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  };
  
  app.use(cors(corsOptions));
connectDB();
app.use(express.json());
app.use(cookieParser())
const __dirname = path.resolve();
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',userRoute)
app.use('/api/v1/post', postRoute); 
app.use('/api/v1/comment', commentRoutes); 


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

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