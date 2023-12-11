import express from 'express';
import mongoose from 'mongoose';
import keys from './config/keys.js'; // Adjusted path
import router from './routes/userDetailRoute.js';  // Adjusted path

const app = express();

// Connect to MongoDB
mongoose.connect(keys.mongodb.dbURI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// parsing JSON in the request body
app.use(express.json());

app.get('/health-check', (req, res) => {res.json('Hello world')})

// userRouter for handling user-related routes
app.use('/api', router); 

// Starting the server
/*`${keys.serverConfig.port}`*/
 app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
