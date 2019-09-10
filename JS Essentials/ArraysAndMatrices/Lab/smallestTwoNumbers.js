function smallestTwoNumbers(arr){
    let smallestNumbers = [] ;
    smallestNumbers.push(Math.min(...arr));
    arr.splice(arr.indexOf(smallestNumbers[0]),1);
    smallestNumbers.push(Math.min(...arr));
    console.log(smallestNumbers.join(" "));
}