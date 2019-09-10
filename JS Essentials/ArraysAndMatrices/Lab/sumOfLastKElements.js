function sumOfElements(n,k){

    let newArr = [1] ;
    let sum = [1,2,3].reduce((a,c) => a+c,0);
    
    for(let i = 1 ; i < n ; i++){
        let start = -1;
        if(i-k < 0){
            start = 0;
        }else{
            start = i-k;
        }

        newArr.push(newArr.slice(start,i).reduce((a,c) => a+c ,0));
    
    }
    console.log(newArr.join(" "));
}
