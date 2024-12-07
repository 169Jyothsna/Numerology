export const calculateLifePathNumber = (dob) => {
  const digits = dob.replace(/-/g, "").split("").map(Number);
  let sum = digits.reduce((acc, num) => acc + num, 0);

  // Reducing the sum of birth date to a single digit or master number (11, 22, 33)
  while (sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, num) => acc + parseInt(num, 10), 0);
  }
  return sum;
};

export const generateBirthChart = (dob) => {
  const digits = dob.replace(/-/g, "").split("");
  const chart = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };

  digits.forEach((digit) => {
    if (chart[digit] !== undefined) {
      chart[digit] += digit;
    }
  });

  return [
    [chart["1"] || "-", chart["4"] || "-", chart["7"] || "-"],
    [chart["2"] || "-", chart["5"] || "-", chart["8"] || "-"],
    [chart["3"] || "-", chart["6"] || "-", chart["9"] || "-"],
  ];
};
