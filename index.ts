
import mongoose from 'mongoose'
import { app } from './app'
import dotenv from 'dotenv'
import autoIncrement from 'mongoose-auto-increment';

const start = async () => {
  console.log('Starting up...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });


    console.log('Connected to mongoDB');
  } catch (error) {
    console.log('failed connecting');
    console.log(error);
  }
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!!`);
  });

};

dotenv.config();
start();