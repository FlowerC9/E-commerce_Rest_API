import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["buyer", "seller"],
    required: true,
    trim: true,
  },
},{
  timestamps:true,
});

userSchema.index({ username: 1, userType: 1 }, { unique: true });


userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.matchPassword=async function(enteredPassword){
  return bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model('User',userSchema);

export default User;