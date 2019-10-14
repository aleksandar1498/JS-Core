function solve(request){
    
    let method = request["method"];
    let uri = request["uri"];
    let httpVersion = request["version"];
    let message = request["message"];
    try{
        validateMethod(method);
        validateURI(uri);
        validatVersion(httpVersion);
        validateMessage(message);
    }catch(ex){
        return ex.message;
    }
    return request;
   
    function validateMethod(method){
        let validMethods = ["GET","POST","DELETE","CONNECT"];
        if(validMethods.includes(method.toUpperCase())){
            return true;
        }
        throw new Error("Invalid request: Invalid Method");
    }
    function validateURI(uri){
        if(uri.match(/^[0-9A-Za-z]+|\\*$/)){
            return true;
        }
        throw new Error("Invalid request: Invalid URI");
    }
    function validateMessage(message){
        if(message.match(/^[0-9]+|[^\<\>\\\&\']+|$/g)){
            return true;
        }
        throw new Error("Invalid request: Invalid Message");
    }
    function validatVersion(version){
        let validVersions = ["HTTP/0.9","HTTP/1.0","HTTP/1.1","HTTP/2.0"];
        if(validVersions.includes(version)){
            return true;
        }
        throw new Error("Invalid request: Invalid Version");
    }
}
console.log(solve({method: 'POST',uri: 'home$',version : "HTTP/0.9",message: ''}));
module.exports = {solve};