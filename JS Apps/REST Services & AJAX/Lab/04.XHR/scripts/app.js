function loadRepos() {
   let xml = new XMLHttpRequest();
   xml.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
         document.getElementById("res").innerHTML = this.responseText;
      }
   }
   xml.open("GET","https://api.github.com/users/testnakov/repos",true);
   xml.send()
}