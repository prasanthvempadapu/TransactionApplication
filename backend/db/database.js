import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
     
    }
}

export default connectDb;