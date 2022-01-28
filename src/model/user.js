import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    enum: ['investor', 'asset-lister'],
    default: 'investor'
  },
  asset_description: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
