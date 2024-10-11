const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  playListId: {  // Consistent naming
    type: String, 
    required: true 
  },
  completedVideos: [String],  // Array of completed video IDs
  totalVideos: { 
    type: Number, 
    required: true 
  },
  isCompleted: { 
    type: Boolean, 
    default: false 
  },
  completionDate: Date
});

module.exports = mongoose.model('Course', courseSchema);
