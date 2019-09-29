function subsum(arr, s, e) {
    if (!Array.isArray(arr) || !arr.every(x => (x+"").match(/([0-9]+(\.[0-9]+)?)/g))) {
        return NaN;
    }
    if (s < 0) {
        s = 0;
    }
    if (e >= arr.length) {
        e = arr.length - 1;
    }
    let tot = 0;
    for (let index = s; index <= e; index++) {
        tot+=arr[index];
        
    }
    return tot;
}
console.log(subsum('text', 0, 2));