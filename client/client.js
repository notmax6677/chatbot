// dependencies
import enquirer from "enquirer"

// bot
import respond from "../src/respond.js"
import punish from "../src/punish.js"
import reward from "../src/reward.js"

// --- client messages ---

const initMessage = "Client has been initiated.";

const space = "";

const connection = "|";

const chat = " -> ";

const you = " you";

const bot = "•";

const punishErrorMessage = "Please make at least one conversational exchange with the bot before using the punish command.";

const rewardErrorMessage = "Please make at least one conversational exchange with the bot before using the reward command.";

const closeMessage = "Client closing...";

// --- commands ---

const command = "$";

const punishCommand = "-";

const rewardCommand = "+";

const exitCommand = "x";

// -- debug mode ---
const debug = true;

const randomGenResponse = "Randomly Generated: ";

const rewardBasedResponse = "Reward Based: ";

const familiarityBasedResponse = "Familiarity Based: ";

// --- actual function ---

// initiate the client routine
export default async function client() {
    // log init message
    console.log(initMessage);

    // space
    console.log(space);

    // quit
    var quit = false;

    // while hasn't quit
    while(!quit) {
        // message from you
        const response = await enquirer.prompt({
            type: "input",
            name: "statement",
            message: you + chat
        });

        // switch case statement with the input
        switch(response.statement) {
            // punish
            case command + punishCommand:
                // attempt to punish and store success
                var success = punish();

                // if punishment was not successful
                if(success === 0) {
                    console.log(space); // log space

                    console.log(punishErrorMessage); // punish err msg
                }

                // log space
                console.log(space);

                break;

            // reward
            case command + rewardCommand:
                // attempt to reward and store success
                var success = reward();

                // if punishment was not successful
                if(success === 0) {
                    console.log(space); // log space

                    console.log(rewardErrorMessage); // reward err msg
                }

                // log space
                console.log(space);

                break;

            // exit
            case command + exitCommand:

                quit = true; // set quit to true to finish the loop

                break;

            // no command matches
            default:
                // default action is to have conversational exchange with bot

                // log connection
                console.log(connection);

                // tell the bot to respond to the message and store the response and the response type in case you want to debug

                var output = respond(response.statement); // [0] = response, [1] = response type

                var givenResponse = output[0];

                var responseType = output[1];

                // if debug is false
                if(!debug) {
                    console.log(bot + chat + givenResponse);
                }
                else {
                    // switch case statement to print the response type along with the output
                    switch(responseType) {
                        case "random":
                            console.log(bot + chat + randomGenResponse + givenResponse);
                            break;

                        case "reward":
                            console.log(bot + chat + rewardBasedResponse + givenResponse);
                            break;

                        case "familiar":
                            console.log(bot + chat + familiarityBasedResponse + givenResponse);
                            break;
                    }
                }

                console.log(space);

                break;
        }
    }

    // log space
    console.log(space);

    // log close message
    console.log(closeMessage);
}