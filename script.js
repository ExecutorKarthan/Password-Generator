//Create a class to organize and track our data
class charType{
  constructor(name, min, max, count){
    this.name = name;
    this.min = min;
    this.max = max;
    this.count = count;
  }

}

//Create a function to ensure string input from the user is a valid number
function inputValidator(userInput){
  validationLoop = true;
  while(validationLoop){
    if(Number.isInteger(userInput)){
      return userInput;
    }
    else{
      //Add code to provide an error and reset
    }
  }
}

//Create a function to generate a random decimal in the appropriate range
function randomize(min, max){
  return Math.floor(Math.random()*(max-min) + min);

}

//Create a function to update the possible password in case it fails verification
function reassignChar(possiblePassword, currentObjNames, objectMap){
  //Select a random letter from the current password to replace
  var randomVal = Math.floor(Math.random()*possiblePassword.length);
  var toBeChanged = possiblePassword[randomVal];
  var charCode = toBeChanged.charCodeAt(0);
  //Determine the type of letter removed and then adjust the appropriate count
  if(charCode >= 97 && charCode <= 122){
    objectMap.get("lower").count = objectMap.get("lower").count -1
  }
  else if(charCode >= 65 && charCode <= 90){
    objectMap.get("upper").count = objectMap.get("upper").count -1
  }
  else if(charCode >= 48 && charCode <= 57){
    objectMap.get("digit").count = objectMap.get("digit").count -1
  }
  else{
    objectMap.get("special").count = objectMap.get("special").count -1
  }
  //Create a new random character to add to the current possiblePassword
  var newChar = ""
  var newTypeValName = currentObjNames[Math.floor(Math.random()*currentObjNames.length)]
  if(objectMap.get(newTypeValName) == "special"){
    var specialRand = Math.lower(Math.random(4));
    newChar =  String.fromCharCode(randomize(objectMap.get(newTypeValName).min[specialRand], randomize(objectMap.get(newTypeValName).max[specialRand])));
    objectMap.get(newTypeValName).count = objectMap.get(newTypeValName).count + 1
  }
  else{
    newChar =  String.fromCharCode(randomize(objectMap.get(newTypeValName).min, objectMap.get(newTypeValName).max));
    objectMap.get(newTypeValName).count = objectMap.get(newTypeValName).count + 1
  }
  //Splice the new random character into the possiblePassword where the old password was
  if(randomVal == 0){
    possiblePassword = newChar + possiblePassword.substring(1, possiblePassword.length)
  }
  else if(randomVal == possiblePassword.length-1){
    possiblePassword = possiblePassword.substring(0, randomVal) + newChar
  }
  else{
    possiblePassword = possiblePassword.substring(0, randomVal) + newChar + possiblePassword.substring(randomVal+1, possiblePassword.length)
  }
  return possiblePassword;
  
}

/*
//Collect what criteria are used for the password 
pwLength = int(inputValidator("input from user that stands for true/false"));
lowerReq = Boolean("input from user that stands for true/false");
upperReq = Boolean("input from user that stands for true/false");
digitReq = Boolean("input from user that stands for true/false");
specialReq = Boolean("input from user that stands for true/false");*/

//test code
pwLength = 10;
lowerReq = true;
upperReq = false;
digitReq = true;
specialReq = true;

//Create a map that stores the requirements
const inputValues = [lowerReq, upperReq, digitReq, specialReq];

//Create a map of all objects needed and a list of current names
var currentObjNames = [];
var objectMap = new Map();
for( var index = 0; index < 4; index++){
  if(inputValues[index] == true && index == 0){
    objectMap.set("lower", new charType("lower", 97, 122, 0));
    currentObjNames.push("lower");
  }
  if(inputValues[index] == true && index == 1){
    objectMap.set("upper", new charType("upper", 65, 90, 0));
    currentObjNames.push("upper");
  }
  if(inputValues[index] == true && index == 2){
    objectMap.set("digit", new charType("digit", 48, 57, 0));
    currentObjNames.push("digit");
  }
  if(inputValues[index] == true && index == 3){
    objectMap.set("special", new charType("special", [32, 58, 91, 123], [47, 64, 96, 126], 0));
    currentObjNames.push("special");
  }
}

//Loop a number of times equal to the password length, adding a new character for the password
var possiblePassword = "";
for(var index = 0; index < pwLength; index++){
  //Randomize the type of character then record what type of character was added to the password
  var randomName = currentObjNames[Math.floor(Math.random()*currentObjNames.length)];

  //Update the count for the randomly selected character type
  objectMap.get(randomName).count = objectMap.get(randomName).count +1

  //Update the possiblePassword with itself and append a new character. if it is a special character, randomly select a range
  if(randomName == "special"){
    var specialRand = Math.floor(Math.random(4));
    possiblePassword = possiblePassword + String.fromCharCode(randomize(objectMap.get(randomName).min[specialRand], objectMap.get(randomName).max[specialRand]));
  }
  else{
    possiblePassword = possiblePassword + String.fromCharCode(randomize(objectMap.get(randomName).min, objectMap.get(randomName).max));
  }
}

//Verify of the password matches the criteria. If not, adjust it and retest it
var failedVerification = true;
while(failedVerification){
  for(var index = 0; index < currentObjNames.length; index++){
    if(objectMap.get(currentObjNames[index]).count < 1){
      failedVerification = true;
      possiblePassword = reassignChar(possiblePassword, currentObjNames, objectMap);
      break;
    }
    else{
      failedVerification = false;
    }
  }
  
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
