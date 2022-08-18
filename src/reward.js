// import data
import data from "./data.js";

// import last statement and response
import { LastStatement, LastResponse } from "./respond.js";

// clean.js
import clean from "./clean.js";

// save.js
import save from "./save.js";

// "rewards" the bot for making a sensible/intelligible conversational exchange
export default function reward() {
    // returned message
    var success;

    if(LastStatement === undefined && LastResponse === undefined) {
        success = 0;
    }
    else { // there has been at least one exchange of conversation
        // clean the last statement and format it
        var cleanedStatement = clean(LastStatement);

        // new responses object
        var newResponses = data.rResponses();

        // if response hasn't yet been logged
        if(data.rResponses()[cleanedStatement] === undefined) {
            // add statement and response
            newResponses[cleanedStatement] = [LastResponse];
        }
        else { // if response has been logged previously
            // add response to existing statement
            newResponses[cleanedStatement].push(LastResponse);
        }

        save.rResponses(newResponses);

        success = 1;
    }

    // return whether or not the process has succeeded
    return success;
}