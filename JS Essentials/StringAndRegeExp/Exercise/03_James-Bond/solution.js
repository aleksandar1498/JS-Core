function solve() {
    let data = JSON.parse(document.getElementById("array").value);
    let specialKey = data[0];
    let textToEncode = data[1];
    console.log(textToEncode);
    if((/[a-zA-Z]+/g).test(specialKey)){
        let pattText = new RegExp("(^| )("+specialKey+")[ ]+(?<encoded>[A-Z!%$#]{8,})( |\\.|\,|$)","gi");
      
        let matches = textToEncode.matchAll(pattText);
        for(let match of matches){
            let {encoded} = match.groups;
            let originalEncoded = encoded;
            
           // console.log(encoded);
            encoded = encoded.replace(/[!]/g,"1");
            encoded = encoded.replace(/%/g,"2");
            encoded = encoded.replace(/#/g,"3");
            encoded = encoded.replace(/\$/g,"4");
            encoded = encoded.split('').map(c => {
                if(/[A-Z]/.test(encoded)){
                   
                    return c.toLowerCase();
                }
                return c;
            }).join('');
            console.log(originalEncoded,encoded);
            let newText = match[0].replace(originalEncoded,encoded);
            console.log(`s ${match[3]}`);
            console.log(newText);
            textToEncode = textToEncode.replace(match[3],newText);
        }
        console.log(textToEncode);

    }
}
