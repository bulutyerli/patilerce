import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('already connected');
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('mongo connected');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default connectDB;
