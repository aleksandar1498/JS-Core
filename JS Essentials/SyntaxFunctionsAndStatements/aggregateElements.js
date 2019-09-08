function aggregateElements(elems){
	aggregate(elems,0,(a,c) => a+c);
	aggregate(elems,0,(a,c) => a+(1/c));
	aggregate(elems,'',(a,c) => a+c);
	function aggregate(arr,initialVal,fun){
		let val = initialVal;
		for(let i=0;i<arr.length;i++){
			val = func(val,arr[i]);
		}
		console.log(val)
	
	}
}