// import data
import data from "./data.js"

// clean.js
import clean from "./clean.js"

// save.js
import save from "./save.js"


// export last statement and response
export var LastStatement;
export var LastResponse;

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

    // if there is a matching rewarded response and reward response chance is less than 30%
    if(data.rResponses()[cleanedStatement] !== undefined && rewardResponseChance < 0.3) {
        rewardResponse = true;

        // pick a random response from rewarded responses
        response = data.rResponses()[cleanedStatement][parseInt(Math.random()*data.rResponses()[cleanedStatement].length)];
    }

    // if a rewarded response hasn't been created then create a response based on punishments
    if(!rewardResponse) {
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

            // random amount of times up to 10, iterate
            for(let i = 0; i < Math.random()*10; i++) {
                // add a random word from the vocabulary
                response += newVocabulary[Number.parseInt(Math.random()*newVocabulary.length)] + " ";
            }

            // remove the last character of the response cus it's an extra space
            response = response.slice(0, response.length-1);
        }
    }

    // update last statement & response
    LastStatement = statement;
    LastResponse = response;

    // return it
    return response;
}