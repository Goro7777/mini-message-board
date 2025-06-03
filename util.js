const MAX_LENGTH = 80;

function getTextShort(textFull) {
    if (textFull.length <= MAX_LENGTH) return textFull;

    let words = textFull.split(" ");
    let textShort = words[0];
    for (i = 1; i < words.length; i++) {
        if (textShort.length + 1 + words[i].length > MAX_LENGTH - 3) {
            textShort += "...";
            break;
        } else {
            textShort += " " + words[i];
        }
    }
    return textShort;
}

module.exports = {
    getTextShort,
};
