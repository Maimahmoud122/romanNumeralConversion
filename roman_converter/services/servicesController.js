import toDecimal from '../converter/toDecimal.js';
import Conversion from '../models/Conversions.js';

// ✅ NO regex here!
const convertRomanToDecimal = async (roman) => {
  const decimal = toDecimal(roman);

  const conversion = new Conversion({
    type: 'to-decimal',
    input: roman,
    output: decimal
  });

  await conversion.save();

  return { roman, decimal };
};


const getAllConversions = async () => {
  return Conversion.find().sort({ timestamp: -1 });
};

// ✅  Get by ID
const getConversionById = async (id) => {
  return Conversion.findById(id);
};

export default {
  convertRomanToDecimal,
  getAllConversions,
  getConversionById  // ✅ Add this
};
