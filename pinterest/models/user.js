const mongoose = require('mongoose');
const plm=require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pinterestClone').then(()=>{
  console.log("db-connected");
})

const userSchema =mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  dp: {
    type: String, // Assuming dp (display picture) is stored as a URL
    default: ''
  },
  posts: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }
  ]
}, {
  timestamps: true
});


userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = { User }
