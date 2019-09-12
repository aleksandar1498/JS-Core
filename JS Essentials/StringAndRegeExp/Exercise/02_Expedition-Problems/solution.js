function solve() {
    let delim = document.getElementById("string").value;
    let text = document.getElementById("text").value;
    let messagePatt = new RegExp("(" + delim + "(?<message>.*?)" + delim + ")", "i");
    let messageMatch = text.match(messagePatt).groups;
    let message = messageMatch.message;
    
    let messageRemover = new RegExp("(" + message + ")", "gi");

    text = text.replace(messageRemover, "").replace(/\s+/g, "");
    let northPatt = /(?<north>north.*?(?<deg>[0-9]{2})[^\,]*\,[^0-9\,]*(?<dec>[0-9]{6}))/gi;
    let northMatches = text.matchAll(northPatt);
    var N = {};

    for (let match of northMatches) {
        let { north, deg, dec } = match.groups;
        N.deg = deg;
        N.dec = dec;



    }

    let eastPatt = /(?<east>east.*?(?<deg>[0-9]{2})[^\,]*\,[^0-9\,]*(?<dec>[0-9]{6}))/gi;
    let eastMatches = text.matchAll(eastPatt);
    var E = {};

    for (let match of eastMatches) {
        let { east, deg, dec } = match.groups;
        E.deg = deg;
        E.dec = dec;
    }
    let res = document.getElementById("result");
    let pN = document.createElement("p");
    pN.innerHTML = `${N.deg}.${N.dec} N`;
    let pE = document.createElement("p");
    pE.innerHTML = `${E.deg}.${E.dec} E`;
    let pM = document.createElement("p");
    pM.innerHTML = `Message: ${message}`;
    res.appendChild(pN);
    res.appendChild(pE);
    res.appendChild(pM);
}