<script>
function rotate(arr){
	let rotation = arr[arr.length-1];
	for(let i=0;i < arr.length ;i++){
		arr.rotate();
	}
	console.log(rotate);
	Array.prototype.rotate = (function() {
    var unshift = Array.prototype.unshift,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0,
            count = count >> 0;

        unshift.apply(this, splice.call(this, count % len, len));
        return this;
    };
})();
}
</script>