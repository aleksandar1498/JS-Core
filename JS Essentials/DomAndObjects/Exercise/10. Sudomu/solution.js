function solve() {
    let table = document.getElementsByTagName("table")[0];
    let divCheck = document.getElementById("check");
    let buttons = document.getElementsByTagName("button");
 
    buttons[0].addEventListener("click", function () {
        let map = [];
        for (const row of document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")) {
            map.push(Array.from(row.getElementsByTagName("td")).reduce((a, c) => {

                c = a.push(Number(c.getElementsByTagName("input")[0].value));
                return a;
            }, []));
        }
        if(checkSudoku(map)){
            table.style.border = '2px solid green';
            divCheck.getElementsByTagName("p")[0].innerHTML = "You solve it! Congratulations!";
            divCheck.style.color = 'green';
        }else{
            table.style.border = '2px solid red';
            divCheck.getElementsByTagName("p")[0].innerHTML = "NOP! You are not done yet...";
            divCheck.style.color = 'red';
        }
        function checkSudoku(map){
           
            for (let i = 0; i < map.length; i++) {
                let workingRow  = map[i].splice(0, map[i].length);
                if(workingRow.some(x => x != 1 && x != 2 && x != 3)){
                    return false;
                }
                workingRow.sort((a, b) => a - b);
                for (let j = 0; j < workingRow.length - 1; j++) {
                    if (workingRow[j] == workingRow[j + 1]) {
                        return false;
                    }
                }
               
            }
            for (let col = 0; col < map[0].length; col++) {
                let workingRow = [];
                for (let row = 0; row < map.length; row++) {
                    workingRow.push(map[row][col]);
                }
                workingRow.sort((a, b) => a - b);
                for (let j = 0; j < workingRow.length - 1; j++) {
                    if (workingRow[j] == workingRow[j + 1]) {
                        return false;
                    }
                }

            }
            return true;


        }

    });
    buttons[1].addEventListener("click", clearTable);
    function clearTable(){
        document.querySelectorAll("input").forEach(x => {
            x.value = "";
        });
        table.style.border = 'none';
        divCheck.getElementsByTagName("p")[0].innerHTML = "";
        divCheck.style.color = 'black';
     
    }
}