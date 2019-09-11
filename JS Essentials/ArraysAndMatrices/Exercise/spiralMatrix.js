function createSpiral(a,b) {
    let dimension = a = b;
    let numConcentricSquares = Math.ceil((dimension) / 2.0).toFixed(0);

    let j;
    let sideLen = dimension;
    let currNum = 1;
    let spiralArray =[];
    for(let d=0;d<dimension;d++){
        spiralArray[d] = [];
    }
    for (let i = 0; i < numConcentricSquares; i++) {
        // do top side
        for (j = 0; j < sideLen; j++) {
            spiralArray[i][i + j] = currNum++;
        }

        // do right side
        for (j = 1; j < sideLen; j++) {
            spiralArray[i + j][dimension - 1 - i] = currNum++;
        }

        // do bottom side
        for (j = sideLen - 2; j > -1; j--) {
            spiralArray[dimension - 1 - i][i + j] = currNum++;
        }

        // do left side
        for (j = sideLen - 2; j > 0; j--) {
            spiralArray[i + j][i] = currNum++;
        }

        sideLen -= 2;
    }
    for(let i=0 ;i < spiralArray.length;i++){
        console.log(spiralArray[i].join(" "));
        
    }
    
}