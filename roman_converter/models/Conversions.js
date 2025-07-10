import mongoose from 'mongoose';

const ConversionSchema = new mongoose.Schema({
  type: String,
  input: String,
  output: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Conversion', ConversionSchema);
