function addRemove(commands) {
    let i = 1;
    let arr = [];
    for(command of commands){
        if(command == "add"){
            arr.push(i);
        }else if(command == "remove"){
            arr.pop();
        }
        i++;
    }
    
    console.log((arr.length > 0)?arr.join("\n"):"Empty");
}