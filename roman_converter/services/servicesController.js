import toDecimal from '../converter/toDecimal.js';
import Conversion from '../models/Conversions.js';

const convertRomanToDecimal = async (roman) => {
  const upperRoman = roman.toUpperCase();

  const validRomanRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  if (!validRomanRegex.test(upperRoman)) {
    throw new Error('Invalid Roman numeral format.');
  }

  const decimal = toDecimal(upperRoman);

  const conversion = new Conversion({
    type: 'to-decimal',
    input: upperRoman,
    output: decimal
  });

  await conversion.save();

  return { roman: upperRoman, decimal };
};

const getAllConversions = async () => {
  return Conversion.find().sort({ timestamp: -1 });
};

// ✅ NEW: Get by ID
const getConversionById = async (id) => {
  return Conversion.findById(id);
};

export default {
  convertRomanToDecimal,
  getAllConversions,
  getConversionById  // ✅ Add this
};
