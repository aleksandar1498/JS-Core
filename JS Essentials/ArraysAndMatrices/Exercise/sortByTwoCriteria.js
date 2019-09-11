function sortByTwoCriteria(arr) {
    console.log(arr.sort((a,b) => {
        if(a.length < b.length){
            return -1;
        }else if(a.length > b.length){
            return 1;
        }
        return a.localeCompare(b);
        
        
    }).join("\n"));
}