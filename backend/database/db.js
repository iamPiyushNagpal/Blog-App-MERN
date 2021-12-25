import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        const con = await mongoose.connect(uri);
        console.log(`Connected to MongoDB: ${con.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;