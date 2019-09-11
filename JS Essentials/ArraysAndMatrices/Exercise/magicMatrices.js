function magic(matrix) {
    let commonSum = matrix[0].reduce((a,c) => a+c,0);
    for(let i=1;i<matrix.length;i++){
        if(matrix[i].reduce((a,c) => a+c,0) != commonSum){
            console.log("false");
            return;
        }
    }
    for(let i=0;i<matrix[0].length;i++){
        let localSum = 0;
        for(let j = 0;j < matrix.length;j++){
            localSum+=matrix[j][i];
        }
        if(localSum != commonSum){
            console.log("false");
            return;
        }
    }
    console.log("true");
}