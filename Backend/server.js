const { config: configDotenv } = require('dotenv');
const express = require('express');
const cloudinary = require('cloudinary').v2; 
const cors= require('cors');
const cookiparser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const jobRouter = require('./routes/jobRouter');
const userRouter = require('./routes/userRouter');
const applicationRouter = require('./routes/applicationRouter');
const { dbConnection } = require('./database/dbconnection');
const { errorMiddleware } = require('./middlewares/error');


const port = process.env.PORT || 3000;

configDotenv();

const app = express();
app.use(express.json());

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});







app.use(cors(
    {origin: [process.env.FRONTEND_URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiparser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));




app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/job', jobRouter);


//errormiddleware
app.use((errorMiddleware));





//connect to database






//listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
