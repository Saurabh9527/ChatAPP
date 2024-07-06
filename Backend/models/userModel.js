
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name : 
    {
        type: String,
        required: true,
    },
    email : 
    {
        type: String,
        required: true,
        unique: true,
    },
    password :  
    {
        type: String,
        required: true,
    },
    avatar : 
    {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    },

  },
  {
    timestamps: true,
  }
);

userSchema.pre('save' , async function(next){
  const user = this;
  if(!user.isModified('password')) return next();

  try {
      const salt = await bcrypt.genSalt(10); 

      const hashedPassword = await bcrypt.hash(user.password , salt);

      user.password = hashedPassword;
      next();

  } catch (error) {
      return next(error)
  }
})

userSchema.methods.comparePassword = async function(candidatePassword){
  try {
      const isMatched = await bcrypt.compare(candidatePassword , this.password);
      return isMatched;
  } catch (error) {
      throw error;
  }
}

 const User = mongoose.model("User", userSchema);
 export default User;
