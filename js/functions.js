function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));


function isPalindrom(str) {
  str = str.toLowerCase();
  return str === str.split('').reverse().join('');
}

console.log(isPalindrom('топот'));
console.log(isPalindrom('ДовОд'));
console.log(isPalindrom('Кекс'));

function extractNumber(arg){
  const string = arg.toString();
  let res = '';
  for(let i = 0; i < string.length; i++){
    if(!Number.isNaN(parseInt(string[i], 10))){
      res += string[i];
    }
  }
  return parseInt(res, 10);
}

console.log(extractNumber('2023 год'));
console.log(extractNumber('ECMAScript 2022'));
console.log(extractNumber('1 кефир, 0.5 батона'));
console.log(extractNumber('агент 007'));
console.log(extractNumber('а я томат'));
console.log(extractNumber(2023));
console.log(extractNumber(-1));
console.log(extractNumber(1.5));
