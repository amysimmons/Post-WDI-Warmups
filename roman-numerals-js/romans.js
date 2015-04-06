var roman_numerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1]
  ]

// all console.logs should be true 
// the logic: the to_roman function should take the num and divide it by each value
// when the result is greater than 0, it should multiply the result by the associated key
// and push that key into the romans string
// it should then set the number to be the remainder, ie whatever was left over from the previous
// division
// and continue working down the javascript array 

var to_roman = function(num){

var roman = ""

  for (var i = 0; i < roman_numerals.length; i++) {
    roman_numeral = roman_numerals[i];
    times = Math.floor(num / roman_numeral[1]);
    roman += Array(times + 1).join(roman_numeral[0]);
    num = num % roman_numeral[1];
  };

  return roman

};

console.log( "I" == to_roman( 1 ) );
console.log( "II" == to_roman( 2 ) );
console.log( "III" == to_roman( 3 ) );
console.log( "IV" == to_roman( 4 ) );
console.log( "V" == to_roman( 5 ) );
console.log( "VI" == to_roman( 6 ) );
console.log( "IX" == to_roman( 9 ) );
console.log( "XXVII" == to_roman( 27 ) );
console.log( "XLVIII" == to_roman( 48 ) );
console.log( "LIX" == to_roman( 59 ) );
console.log( "XCIII" == to_roman( 93 ) );
console.log( "CXLI" == to_roman( 141 ) );
console.log( "CLXIII" == to_roman( 163 ) );
console.log( "CDII" == to_roman( 402 ) );
console.log( "DLXXV" == to_roman( 575 ) );
console.log( "CMXI" == to_roman( 911 ) );
console.log( "MXXIV" == to_roman( 1024 ) );
console.log( "MMM" == to_roman( 3000 ) );


// Jack's solution from class:
// function to_roman(num){
//   var result = ''
//   for (var i = 0; i < roman_numerals.length; i++) {
//     var roman = roman_numerals[i][0];
//     var integer = roman_numerals[i][1]

//         while (num >= integer) {
//           result += roman
//           num -= integer
//         }


//   };
//   return result
// }
