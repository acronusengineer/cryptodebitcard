export const dateFormat = (pattern: string, date: Date) => {
  let formattedToday = "";
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();
  let month,
    day = "";
  if (dd < 10) {
    day = "0" + dd;
  } else {
    day = dd.toString();
  }
  if (mm < 10) {
    month = "0" + mm;
  } else {
    month = mm.toString();
  }
  if (pattern == "DD/MM/YYYY") {
    formattedToday = day + "/" + month + "/" + yyyy;
  } else if (pattern === "YYYY-MM-DD") {
    formattedToday = yyyy + "-" + month + "-" + day;
  }
  return formattedToday;
};

export const genRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const detectCardType = (cardNumber: string): string => {
  // Remove any non-digit characters from the card number
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');

  // Define the regular expressions for each card type
  const cardTypes = [
    {
      type: 'Visa',
      pattern: /^4[0-9]{12}(?:[0-9]{3})?$/
    },
    {
      type: 'MasterCard',
      pattern: /^5[1-5][0-9]{14}$/
    },
    // {
    //   type: 'American Express',
    //   pattern: /^3[47][0-9]{13}$/
    // },
    // {
    //   type: 'Discover',
    //   pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/
    // },
  ];

  // Loop through each card type and check if the card number matches the pattern
  for (const cardType of cardTypes) {
    if (cardType.pattern.test(cleanedCardNumber)) {
      return cardType.type;
    }
  }

  // If no card type matches, return "Unknown"
  return 'Unknown';
}
