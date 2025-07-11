import toDecimal from '../converter/toDecimal.js';
import Conversion from '../models/Conversions.js';


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

const updateConversion = async (id, upperRoman) => {
  const decimal = toDecimal(upperRoman);

  const updated = await Conversion.findByIdAndUpdate(
    id,
    {
      input: upperRoman,
      output: decimal,
      timestamp: Date.now(), 
    },
    { new: true } // return the updated document
  );

  if (!updated) {
    throw new Error('Conversion not found.');
  }

  return updated;
};

const deleteConversion = async (id) => {
  return await Conversion.findByIdAndDelete(id);
};







export default {
  convertRomanToDecimal,
  getAllConversions,
  getConversionById, 
  updateConversion,
  deleteConversion
};
