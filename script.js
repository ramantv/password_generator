// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// Declare arrays for lower case chars, upper case chars, digits and special chars.

/*
const alphabet = "abcdefghijklmnopqrstuvwxyz";
var lowerCaseChars = alphabet.split("");
var upperCaseChars = alphabet.toUpperCase().split("");
var digits = "0123456789".split("");
var splChars = "!\"#$%&\'()*+,-.\/:\;<=>?@[\\]^_\`{|}~".split("");

var lowerCaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCaseChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var splChars = ['!', '\"', '#', '$', '%', '&', "\'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
*/

const allLowerCaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const allUpperCaseChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const allDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const allSpecialChars = ['!', '\"', '#', '$', '%', '&', "\'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

// Function to generate the password
function generatePassword() {
  let desiredValues = promptUser();

  let passwordLength = desiredValues.desiredPasswordLength;
  let wantLower = desiredValues.wantLowerCase;
  let wantUpper = desiredValues.wantUpperCase;
  let wantNumbers = desiredValues.wantDigits;
  let wantSplChars = desiredValues.wantSplChars;

  var requirements = "Desired Password Length = " + passwordLength + "\n Want Lower Case = " + wantLower + "\n Want Upper Case = " + wantUpper + "\n Want Digits = " + wantNumbers + "\n Want Special Chars = " + wantSplChars;
  alert(requirements);

  ret = createPasword (passwordLength, wantLower, wantUpper, wantNumbers, wantSplChars);
  return ret;
}

// collect the desired password length and character types to be included from the user.
function promptUser() {
  var desiredPasswordLength = 0;
  while (desiredPasswordLength < 8 || desiredPasswordLength > 128) {
    desiredPasswordLength = prompt("What is the desired password length? (Enter a number between 8 and 128): ");
    console.log("password length Needed = " + desiredPasswordLength);
    if (isNaN(desiredPasswordLength)) {
      desiredPasswordLength = 0;
    }
  }

  var wantLowerCase = "";
  var wantUpperCase = "";
  var wantDigits = "";
  var wantSplChars = "";
  var noCharSetSelected = true;

  do {
    while (wantLowerCase != "Y" && wantLowerCase != "N") {
      wantLowerCase = prompt("Do you want to include Lower case characters in the password? (Enter Y or N): ");
      wantLowerCase = wantLowerCase.toUpperCase();
      console.log("Want Lower Case chars = " + wantLowerCase);
    }
  
    while (wantUpperCase != "Y" && wantUpperCase != "N") {
      wantUpperCase = prompt("Do you want to include Upper case characters in the password? (Enter Y or N): ");
      wantUpperCase = wantUpperCase.toUpperCase();
      console.log("Want Upper Case chars = " + wantUpperCase);
    }
  
    while (wantDigits != "Y" && wantDigits != "N") {
      wantDigits = prompt("Do you want to include Numbers in the password? (Enter Y or N): ");
      wantDigits = wantDigits.toUpperCase();
      console.log("Want Digits = " + wantDigits);
    }
  
    while (wantSplChars != "Y" && wantSplChars != "N") {
      wantSplChars = prompt("Do you want to include Special characters in the password? (Enter Y or N): ");
      wantSplChars = wantSplChars.toUpperCase();
      console.log("Want Special chars = " + wantSplChars);
    }

    noCharSetSelected = (wantLowerCase != "Y" && wantUpperCase != "Y" && wantDigits != "Y" && wantSplChars != "Y");
    console.log ("No Character Type selected = " + noCharSetSelected);

    if (noCharSetSelected) {
      console.log("You must pick at least one of lower case, upper case, numbers or special characters.");
      alert("You must pick at least one of lower case, upper case, numbers or special characters .");
      wantLowerCase = "";
      wantUpperCase = "";
      wantDigits = "";
      wantSplChars = "";
    }
  } 
  while (noCharSetSelected);

  // return user requirements
  return {
    desiredPasswordLength,
    wantLowerCase,
    wantUpperCase,
    wantDigits,
    wantSplChars,
  };
}

// this function will create a random password based on the supplied user requirements
function createPasword(desiredLength, wantLowerCase, wantUpperCase, wantNumbers, wantSpecialChars) {

  var returnPassword = "";
  var allowedCharSet = [];

  // If user has elected to include lower Case chars, 
  // add one random lower case char to the password first.
  // then add all the lower case chars to the allowed char set.
  if (wantLowerCase == "Y") {
    returnPassword += getRandomChar(allLowerCaseChars);
    allowedCharSet = allowedCharSet.concat(allLowerCaseChars);
  }

  // If user has elected to include upper Case chars, 
  // add one random upper case char to the password first.
  // then add all the lower case chars to the allowed char set.
  if (wantUpperCase == "Y") {
    returnPassword += getRandomChar(allUpperCaseChars);
    allowedCharSet = allowedCharSet.concat(allUpperCaseChars);
  }

  // If user has elected to include numbers, 
  // add one random digit to the password first.
  // then add all the digits to the allowed char set.
  if (wantNumbers == "Y") {
    returnPassword += getRandomChar(allDigits);
    allowedCharSet = allowedCharSet.concat(allDigits);
  }

  // If user has elected to include special chars, 
  // add one random special char to the password first.
  // then add all the Special chars to the allowed char set.
  if (wantSpecialChars == "Y") {
    returnPassword += getRandomChar(allSpecialChars);
    allowedCharSet = allowedCharSet.concat(allSpecialChars);
  }

  // Now we have ensured that at leat one char of each type of character selected is present in the password
  // and that the allowed char set contains only the universal set of all selected types of characters.
  console.log("password so far = " + returnPassword);
  console.log("password length so far = " + returnPassword.length);
  console.log("Allowed Character Set = " + allowedCharSet);
  console.log("Allowed Character Set Array Length = " + allowedCharSet.length);

  // Shuffle the set of allowed chars so you have better random selection.
  var universalCharSet = shuffle(allowedCharSet);
  console.log("Allowed Character Set Shuffled (Universal Char set) = " + universalCharSet);
  console.log("Universal Character Set Array Length = " + universalCharSet.length);

  // Now we can randomly pick the characters from the Universal char set for the remainder of the desired length.
  let i=returnPassword.length;
  do {
    returnPassword += getRandomChar(universalCharSet);
    i++;
  } while (i<desiredLength);

  console.log("password generated = " + returnPassword);
  console.log("Generated Password Length = " + returnPassword.length);

  return returnPassword;
}

// returns a random character from an array of characters supplied.
function getRandomChar(charArray) {
  return charArray[Math.floor(Math.random() * charArray.length)];
}

// shuffle an array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

