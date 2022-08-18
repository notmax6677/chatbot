// import fs
import fs from "node:fs"

// export vocabulary and responses
export default {
  vocabulary() {
    return JSON.parse(fs.readFileSync("./src/data/Vocabulary.json"));
  },

  pResponses() {
    return JSON.parse(fs.readFileSync("./src/data/PunishedResponses.json"));
  },

  rResponses() {
    return JSON.parse(fs.readFileSync("./src/data/RewardedResponses.json"));
  }
}