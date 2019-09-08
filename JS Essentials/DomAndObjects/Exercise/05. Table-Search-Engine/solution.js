function solve() {
   let results = [];
   document.getElementById("searchBtn").addEventListener("click", function () {
   let input = document.getElementById("searchField").value;
   document.getElementById("searchField").value = '';
   let rows = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
   while(results.length > 0){
      rows[results.pop()].className='';
   }

   for(let i = 0; i < rows.length;i++){
     
      let entries = rows[i].getElementsByTagName("td");
      for(const entry of entries){
         if(entry.innerHTML.includes(input)){
            rows[i].className='select';
            results.push(i);
            break
         }
      }
   }

   });
}