import Conversion from '../models/Conversions.js';

export default async function validateRoman(req, res, next) {
  const { roman } = req.body;

  if (!roman || typeof roman !== 'string') {
    // Log failed attempt to DB
    await Conversion.create({
      type: 'error',
      input: roman || '',
      output: 'Missing or invalid type',
    });

    return res.status(400).json({ error: 'Please provide a Roman numeral as a string.' });
  }

  const upperRoman = roman.toUpperCase();
  const validRomanRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  if (!validRomanRegex.test(upperRoman)) {
    await Conversion.create({
      type: 'error',
      input: upperRoman,
      output: 'Invalid Roman numeral format'
    });

    return res.status(400).json({ error: 'Invalid Roman numeral format.' });
  }

  req.upperRoman = upperRoman;

  next();
}
