function buildMap(arr) {
let obj={};
for(let i = 0 ; i < arr.length ;i+=2){
obj[arr[i].toString()] = Number(arr[i+1]);
}

console.log(obj);
	}