import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Optional: Increase timeout
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process on failure
    }
};

export default connectDB;
