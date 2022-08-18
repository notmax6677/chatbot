// clean a piece of text from unwanted characters
export default function clean(input) {
    // remove all characters except for numbers and letters
    return input.replace(/[^\s\dA-Z]/gi, "").toLowerCase();
}