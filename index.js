import express from 'express';
import mongoose from 'mongoose';
import validateRoman from './roman_converter/middleware/validateRoman.js';
import converterController from './roman_converter/controllers/converterController.js';



const app = express();
const port = 8000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/romanDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.post('/to-decimal', validateRoman, converterController.convertToDecimal);
app.get('/conversions', converterController.getAllConversions);
app.get('/conversions/:id', converterController.getConversionById);
app.put('/conversions/:id', validateRoman, converterController.updateConversion);
app.delete('/conversions/:id', converterController.deleteConversion);


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
