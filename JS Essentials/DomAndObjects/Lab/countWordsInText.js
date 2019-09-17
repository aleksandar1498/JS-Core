function countWordsInText(text){
    text[0] = text[0].replace(/[^A-Za-z0-9\_]/g,"");
    console.log(text[0]);
}
countWordsInText(['Far too slow, you're far too slow.'])