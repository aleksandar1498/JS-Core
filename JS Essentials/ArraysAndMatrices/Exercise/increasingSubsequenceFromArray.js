function increasingSubsequnce(arr) {
    let greatest = arr[0];
    let newArr = [greatest];
    for(let i=1;i<arr.length;i++){
        if(arr[i] >= greatest){
            newArr.push(arr[i]);
            greatest = arr[i];
        }
    }
    console.log(newArr.join("\n"));
}