function solve() {
    let expression = document.getElementById("expressionOutput");
    let result = document.getElementById("resultOutput");
let regexExpression = /([0-9]+[*\/+-]{1}[0-9]+)/g;
    document.getElementsByClassName("clear")[0].addEventListener("click",function(){
        expression.innerHTML = "";
        result.innerHTML = "";
    });
    let buttons = document.getElementsByClassName("keys")[0].getElementsByTagName("button");
    for(const btn of buttons){
        btn.addEventListener("click",function(){
            let value = this.value
            if(value == "="){
                try{
                    if(regexExpression.test(expression.innerHTML.replace(/\s+/g,"")) == false){
                        throw SyntaxError("Missing operands");
                    }
                    result.innerHTML = eval(expression.innerHTML);
                }catch(SyntaxError){
                    result.innerHTML = "NaN";
                }
                
                return;
            }else if(value == "+" || value == "-" || value == "*" || value == "/"){
                expression.innerHTML+=" "+this.value+" ";
            }else{
                expression.innerHTML+=this.value;
            }
           
            
        });
    }
    //TODO...
}