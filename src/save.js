// import fs
import fs from "node:fs"

// writes new data to json files
export default {
    // vocabulary.json
    vocabulary(data) {
        // write to vocabulary.json
        fs.writeFile("./src/data/Vocabulary.json", JSON.stringify(data), 
            (err) => { // lambda function for error variable
                // if error exists throw it
                if(err) throw err;
            }
        );
    },

    // punishedResponses.json
    pResponses(data) {
        // write to vocabulary.json
        fs.writeFile("./src/data/PunishedResponses.json", JSON.stringify(data), 
            (err) => { // lambda function for error variable
                // if error exists throw it
                if(err) throw err;
            }
        );
    },

    // rewardedResponses.json
    rResponses(data) {
        // write to vocabulary.json
        fs.writeFile("./src/data/RewardedResponses.json", JSON.stringify(data), 
            (err) => { // lambda function for error variable
                // if error exists throw it
                if(err) throw err;
            }
        );
    },
}