
export const isValidCardNumber = (number: string | undefined) => {
    let num = Array.from(String(number), Number);
    let lastDigit = num.pop();
    
    num.reverse();
    let sum = num.reduce((total, value, index) => {
        if (index % 2 !== 0) {
            return total + value;
        } else {
            let doubled = value * 2;
            return total + (doubled > 9 ? doubled - 9 : doubled);
        }
    }, 0);
    
    return (sum * 9) % 10 === lastDigit;
}

export const isValidNumberString = (str: string | undefined) => {
    return !isNaN(Number(str));
}

export const reduceStr = (str: string) => {
    let start = str.substring(0, 7);
    let end = str.substring(str.length-6);
    let output = `${start}...${end}`;
    return output;
}