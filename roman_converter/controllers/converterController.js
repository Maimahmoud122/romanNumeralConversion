import converterService from '../services/servicesController.js';


const convertToDecimal = async (req, res) => {
  try {
    const result = await converterService.convertRomanToDecimal(req.upperRoman);
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

// ✅ Get single conversion by ID
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

const updateConversion = async (req, res) => {
  const { id } = req.params;
  const upperRoman = req.upperRoman;

  try {
    const updated = await converterService.updateConversion(id, upperRoman);
    res.json({ message: 'Conversion updated successfully.', updated });
  } catch (err) {
    if (err.message === 'Conversion not found.') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to update conversion: ' + err.message });
  }
};

const deleteConversion = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await converterService.deleteConversion(id);
    res.json({ message: 'Conversion deleted successfully.', deleted });
  } catch (err) {
    if (err.message === 'Conversion not found.') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to delete conversion: ' + err.message });
  }
};





export default {
  convertToDecimal,
  getAllConversions,
  getConversionById,
  updateConversion,
  deleteConversion
};
