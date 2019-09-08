function solve() {
    $("#container > button").on('click',function(){
        let numberInput = $("#input").val();
        let toOption =  $("#selectMenuTo").val();
        switch (toOption) {  
                case "binary":  
                $("#result").val(parseInt(numberInput, 10).toString(2)+"");
                break;  
                case "hexadecimal":  
                $("#result").val(parseInt(numberInput, 10).toString(16)+"");
                break;  
        }
    
    });
}