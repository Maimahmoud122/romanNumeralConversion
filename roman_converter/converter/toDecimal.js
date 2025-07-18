export default function toDecimal(roman) {
  const romanToInt = {
    I: 1, V: 5, X: 10,
    L: 50, C: 100,
    D: 500, M: 1000
  };

  let total = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const current = romanToInt[roman[i]];
    if (!current) {
      throw new Error('Invalid Roman numeral character.');
    }

    if (current < prev) {
      total -= current;
    } else {
      total += current;
      prev = current;
    }
  }

  return total;
}
