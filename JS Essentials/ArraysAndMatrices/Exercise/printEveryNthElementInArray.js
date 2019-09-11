function printEveryNthElement(arr) {
    let step = Number(arr[arr.length - 1]);
    for (let i = 0; i < arr.length - 1; i+=step) {
        console.log(arr[i]);
    }
}