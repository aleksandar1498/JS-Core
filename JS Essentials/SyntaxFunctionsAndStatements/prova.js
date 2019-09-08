function cook(input){
    let number = Number(input[0]);
    let operations = input.slice(1,input.length);
    for(let i = 0; i < operations.length;  i++){
        number = parseOperation(number,operations[i]);
        if(number-number.toFixed(1) > 0.0){
            console.log(Number(number.toFixed(1)));
        }else{
            console.log(number);
        }
        
    }
    function parseOperation(number,operation){
        let newResult = number;
        switch(operation){
            case 'chop':
                newResult/=2;
                break;
            case 'dice':
                newResult = Math.sqrt(number);
                break;
            case 'spice':
                newResult+=1;
                break;
            case 'bake':
                newResult*=3;
                break;
            case 'fillet':
                newResult*=.8;
                break;
        }
        return newResult;
    }
}