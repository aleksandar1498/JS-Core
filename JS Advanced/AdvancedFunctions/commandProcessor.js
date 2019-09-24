function commandProcessor(){
	let str = "";
	return {
		append : (appender) => str = str+appender,
		removeStart : (n) => str=str.substr(n),
		removeEnd : (n) => str=str.slice(0,str.length-n),
		print : () => console.log(str)
	}
}
