// import data
import data from "./data.js";

// import last statement and response
import { LastStatement, LastResponse } from "./respond.js";

// clean.js
import clean from "./clean.js";

// save.js
import save from "./save.js";

// "punishes" the bot for making a verbally or grammatically incorrect statement
export default function punish() {
    // returned message
    var success;

    if(LastStatement === undefined && LastResponse === undefined) {
        success = 0;
    }
    else { // there has been at least one exchange of conversation
        // clean the last statement and format it
        var cleanedStatement = clean(LastStatement);

        // new responses object
        var newResponses = data.pResponses();

        // if response hasn't yet been logged
        if(data.pResponses()[cleanedStatement] === undefined) {
            // add statement and response
            newResponses[cleanedStatement] = [LastResponse];
        }
        else { // if response has been logged previously
            // add response to existing statement
            newResponses[cleanedStatement].push(LastResponse);
        }

        // filter out duplicate responses
        newResponses[cleanedStatement] = newResponses[cleanedStatement].filter((item, index) => 
            newResponses[cleanedStatement].indexOf(item) === index
        );

        save.pResponses(newResponses);

        success = 1;
    }

    // return whether or not the process has succeeded
    return success;
}