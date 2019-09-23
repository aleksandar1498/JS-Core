function solve(args) {
    let typesCounter = {};
    
    for (let arg of arguments) {
        if (!typesCounter[typeof arg]) {
            typesCounter[typeof arg] = 1;;
        }else{
            typesCounter[typeof arg]++;
        }
       
        if (typeof arg == "object") {
            console.log(typeof arg+": ");
        } else {
            console.log(typeof arg + ": " + arg);
            
        }
    }

    let sortedtypesCounter = Array.from(Object.entries(typesCounter)).sort((a, b) => {
        return  b[1] - a[1];
    });
    for (const type of sortedtypesCounter) {
        console.log(type[0] + " = " + type[1]);
    }
}
solve({ name: 'bob' }, 3.333, 9.999)