function printArrayByDelimiter(arr){
    let delimeter = arr[arr.length-1];
    console.log(arr.slice(0,arr.length-1).join(delimeter));
    }
