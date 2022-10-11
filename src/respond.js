// import data
import data from "./data.js"

// clean.js
import clean from "./clean.js"

// save.js
import save from "./save.js"


// export last statement and response
export var LastStatement;
export var LastResponse;

// function that gets the amount of same characters in two strings
// THANK YOU STACKOVERFLOW (https://stackoverflow.com/questions/55350674/how-to-count-common-characters-in-two-strings-in-javascript)
function getSameChars(str1, str2) {
    let count = 0;
    const obj = str2.split("");
    for(let str of str1){
      let idx = obj.findIndex(s => s === str);
      if(idx >= 0){
        count++;
        obj.splice(idx, 1);
      }
    }
    return count;
}

// finds a response to a similar statement amongst the rewarded responses
function findSimilarResponse(cleanedStatement) {
    // amount of similar characters necessary to respond with a similar statement's response
    var similarChars = cleanedStatement.length/2; // 50% of the amount of chars in the statement

    // variable to hold response in
    var response = "";

    // keep a memory of the most similar statement
    var mostMatchingLetters = 0;
    var mostMatchingStatement = "";

    // iterate through reward responses
    for(const statement in data.rResponses()) {
        // if not looking at the same response
        if(cleanedStatement !== statement) {
            // number of matching letters
            var matchingLetters = 0;

            // get the amount of same characters between the cleaned statement and the statement fetched from json
            // when inputting them as parameters to increase accuracy of matching, remove the spaces between words
            matchingLetters = getSameChars(cleanedStatement.replace(/\s/g, ''), statement.replace(/\s/g, ''));

            // if new matching letters is greater than the previous matching letters
            if(matchingLetters > mostMatchingLetters) {
                // take the old one's place
                mostMatchingLetters = matchingLetters;
                mostMatchingStatement = statement;
            }
        }
    }

    // if the most similar statement has at least $similarChars characters in common with the statement
    if(mostMatchingLetters >= similarChars) {
        response = data.rResponses()[mostMatchingStatement][Math.floor(Math.random() * data.rResponses()[mostMatchingStatement].length)]
    }

    // return the response
    return response;
}

// respond to a statement
export default function respond(statement) {
    // split the statement into words
    var words = clean(statement).split(" ");

    // add new words to vocabulary and create new vocab
    var newVocabulary = data.vocabulary().concat(words);

    // filter out duplicates by only keeping the first indexed object
    newVocabulary = newVocabulary.filter((item, index) => 
        newVocabulary.indexOf(item) === index
    );

    // save new vocabulary to files
    save.vocabulary(newVocabulary);

    // now create a response

    // empty string
    var response = "";

    // maximum amount of words that the bot can respond with at one time
    var maximumWords = 10;

    // clean the last statement and format it
    var cleanedStatement = clean(statement);

    // create a response based on previous rewarded responses
    var rewardResponse = false;

    // chance to create a rewarded response
    var rewardResponseChance = Math.random();

    // ---
    var responseType = ""; // the type of response that is given
    // ---

    // if the reward response chance is less than 30%
    if(rewardResponseChance < 0.3) {
        // chance of getting a response from a similar statement
        var similarResponseChance = Math.random();

        // if the chance is less than 50%
        if(similarResponseChance < 0.5) {
            response = findSimilarResponse(cleanedStatement);

            responseType = "familiar";
        }

        // if there is a matching rewarded response and a response is still empty (meaning a response hasn't been generated yet)
        if(data.rResponses()[cleanedStatement] !== undefined && response === "") {
            // pick a random response from rewarded responses
            response = data.rResponses()[cleanedStatement][parseInt(Math.random()*data.rResponses()[cleanedStatement].length)];

            responseType = "reward";
        }

        // if a response has been generated (not equals nothing)
        if(response !== "") {
            // set reward response to true
            rewardResponse = true;
        }
    }


    // if a rewarded response hasn't been created then create a response based on punishments
    if(!rewardResponse) {

        responseType = "random";

        // if there is a matching statement
        if(data.pResponses()[cleanedStatement] !== undefined) {
            // created unique response (default: false)
            var createdUniqueResponse = false;

            // while haven't created a unique response
            while(!createdUniqueResponse) {
                // random amount of times up to $maximumWords, iterate
                for(let i = 0; i < Math.random()*maximumWords; i++) {
                    // add a random word from the vocabulary
                    response += newVocabulary[Number.parseInt(Math.random()*newVocabulary.length)] + " ";
                }

                // remove the last character of the response cus it's an extra space
                response = response.slice(0, response.length-1);

                // found
                let found = false;

                // iterate through responses
                for(let i = 0; i < data.pResponses()[cleanedStatement].length; i++) {
                    // if response equals a response already logged
                    if(response === data.pResponses()[cleanedStatement][i]) {
                        found = true; // found response = true
                    }
                }

                // if haven't found a matching response in the json
                // this means that a unique response has been generated
                if(!found) {
                    createdUniqueResponse = true;
                }
            }
        }
        else { // if response to statement hasn't been made yet
            // just create any response

            // random amount of times up to $maximumWords, iterate
            for(let i = 0; i < Math.random()*maximumWords; i++) {
                // add a random word from the vocabulary
                response += newVocabulary[Number.parseInt(Math.random()*newVocabulary.length)] + " ";
            }

            // look for similar statements that there might be a response to

            // remove the last character of the response cus it's an extra space
            response = response.slice(0, response.length-1);
        }
    }

    // update last statement & response
    LastStatement = statement;
    LastResponse = response;

    // return it
    return [response, responseType];
}