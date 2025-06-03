const MAX_LENGTH = 80;

function getTextShort(textFull) {
    let lines = textFull.split("\n");
    let firstLine;
    for (let line of lines) {
        firstLine = line.trim();
        if (firstLine) break;
    }

    if (firstLine.length <= MAX_LENGTH && lines.length === 1) return firstLine;

    return getLineEllipsis(firstLine);
}

function getLineEllipsis(line) {
    if (line.length <= MAX_LENGTH - 3) return line + "...";

    let words = line.split(" ");
    let lineEllipsis = words[0];
    if (lineEllipsis.length > MAX_LENGTH - 3) {
        return lineEllipsis.substr(0, MAX_LENGTH - 3) + "...";
    }

    for (i = 1; i < words.length; i++) {
        if (lineEllipsis.length + 1 + words[i].length > MAX_LENGTH - 3) {
            lineEllipsis += "...";
            break;
        } else {
            lineEllipsis += " " + words[i];
        }
    }
    return lineEllipsis;
}

module.exports = {
    getTextShort,
};
