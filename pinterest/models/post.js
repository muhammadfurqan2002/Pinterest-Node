const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema({
  postText: {
    type: String,
    required: true,
    trim: true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  likes: {
    type: Array,
    default: []
  },
  dateTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports={
    Post
}
