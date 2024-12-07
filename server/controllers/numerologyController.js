const Numerology = require('../models/numerologyModel'); 

const calculateLifePathNumber = (dob) => {
  let sum = dob.replace(/-/g, '').split('').reduce((acc, num) => acc + Number(num), 0);

  while (sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, num) => acc + Number(num), 0);
  }
  return sum;
};

exports.generateNumerology = async (req, res) => {
  const { name, dob } = req.body;

  console.log('Request body:', req.body);

  if (!name || !dob) {
    return res.status(400).json({ error: 'Name and date of birth are required!' });
  }

  const lifePathNumber = calculateLifePathNumber(dob);
  const message = `Your Life Path Number is ${lifePathNumber}. It represents your traits and purpose.`;

  try {
    const numerology = new Numerology({ name, dob, lifePathNumber, message });
    console.log('Saving numerology data:', numerology);
    await numerology.save();
    res.status(200).json(numerology);
  } catch (err) {
    console.error('Error saving numerology data:', err); 
    res.status(500).json({ error: 'Failed to save numerology data' });
  }
};

