import express from 'express';
import mongoose from 'mongoose';
import validateRoman from './roman_converter/middleware/validateRoman.js';
import converterController from './roman_converter/controllers/converterController.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';





const app = express();
const port = 8000;

app.use(cors()); // Add this before routes
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static files from "client" folder
app.use(express.static(path.join(__dirname, 'client')));


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


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
