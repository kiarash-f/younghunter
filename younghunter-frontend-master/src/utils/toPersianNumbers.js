const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export default function toPersianNumbersWithComma(number) {
  const numWithCommas = numberWithCommas(number);
  const persianNumber = toPersianNumbers(numWithCommas);
  return persianNumber;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toPersianNumbers(number) {
  return number.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
}
