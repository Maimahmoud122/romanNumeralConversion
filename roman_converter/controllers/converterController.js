import converterService from '../services/servicesController.js';

const convertToDecimal = async (req, res) => {
  const { roman } = req.body;

  if (!roman || typeof roman !== 'string') {
    return res.status(400).json({ error: 'Please provide a Roman numeral as a string.' });
  }

  try {
    const result = await converterService.convertRomanToDecimal(roman);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllConversions = async (req, res) => {
  try {
    const conversions = await converterService.getAllConversions();
    res.json({ conversions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversions: ' + err.message });
  }
};

// ✅ NEW: Get single conversion by ID
const getConversionById = async (req, res) => {
  const { id } = req.params;
  try {
    const conversion = await converterService.getConversionById(id);
    if (!conversion) {
      return res.status(404).json({ error: 'Conversion not found' });
    }
    res.json(conversion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversion: ' + err.message });
  }
};

export default {
  convertToDecimal,
  getAllConversions,
  getConversionById  // ✅ Add this
};
