import express , { Application, Request, Response,json,urlencoded } from 'express';
import mongoose from 'mongoose';
import keys from './config/keys.js'; 
import router from './routes/userDetailRoute.js';

const app : Application = express();

// Connect to MongoDB
mongoose.connect(keys.mongodb.dbURI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// parsing JSON in the request body
app.use(json({ limit: '100mb' }));
app.use(urlencoded({ limit: '100mb', extended: true }));

app.get('/health-check', (req:Request, res:Response) => {res.json('Hello world')})

// userRouter for handling user-related routes
app.use('/api', router);
// Starting the server
/*`${keys.serverConfig.port}`*/
 app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
