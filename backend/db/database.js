import mongoose from 'mongoose';
const connectDb = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://prasanthvempadapu:surya1997@cluster0.erbkbnw.mongodb.net/transactions');
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
     
    }
}

export default connectDb;