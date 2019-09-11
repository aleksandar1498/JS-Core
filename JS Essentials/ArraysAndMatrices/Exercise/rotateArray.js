function rotate(arr) {
    let rotations = Number(arr[arr.length - 1]);
    arr.pop();
    for (let i = 0; i < rotations; i++) {
        arr.splice(0,0,arr.pop());
    }
    
    console.log(arr.join(" "));
}