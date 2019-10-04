function solve() {
    document.getElementsByTagName("button")[0].addEventListener("click",function(ev){
        let current = ev.target;
        let input = current.previousElementSibling;
        if(input.value === ''){
            return;
        }
        let name = input.value;
        name = name[0].toUpperCase()+name.slice(1,name.length).toLowerCase();
        let indexOfLi = name.charCodeAt(0) - 65;
        let li = document.getElementsByTagName("li")[indexOfLi];
        if(li.textContent.length == 0){
            li.textContent=name;
        }else{
            li.textContent+=`, ${name}`
        }
        input.value = ''
       
    });
}