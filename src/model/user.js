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
    default: 'investor',
    required: true,
  },
  asset_description: {
    type: String,
  },
});

userSchema.set('timestamps', true);

export default mongoose.model('User', userSchema);
