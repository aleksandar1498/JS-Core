function result() {
    addOptionsToMenu();
    document.getElementsByTagName("button")[0].addEventListener("click",function(){

       let numberInput = $("#input").val();
        let toOption =  $("#selectMenuTo").val();
        switch (toOption) {  
                case "binary":  
                $("#result").val(parseInt(numberInput, 10).toString(2)+"");
                break;  
                case "hexadecimal":  
                $("#result").val((parseInt(numberInput, 10).toString(16)+"").toUpperCase());
               
                break;  
        }
     
    });
    function addOptionsToMenu(){
        let menu = document.getElementById("selectMenuTo");
        let binaryOption = document.createElement("option");
        binaryOption.innerHTML = "Binary";
        binaryOption.value = "binary";
        let hexOption = document.createElement("option");
        hexOption.innerHTML = "Hexadecimal";
        hexOption.value = "hexadecimal";
        menu.appendChild(binaryOption);
        menu.appendChild(hexOption);
    }
}
