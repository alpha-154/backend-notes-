import mongoose from 'mongoose';

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  }, { timestamps: true}
  );
  
  // Model
 const User = mongoose.model('User', userSchema);
  
 export { User }