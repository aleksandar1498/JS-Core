
    function play(actions) {
        let dashboard = [
            [false,false,false],
            [false,false,false],
            [false,false,false]
        ];
        let playerOne = true;
        let used = 0;
        for (let i = 0; i < actions.length; i++) {
           
            let action = actions[i].split(" ").map(x => Number(x));
            let r = action[0];
            let c = action[1];
            if(dashboard[r][c]){
                    console.log("This place is already taken. Please choose another!");
                    continue;
            }
            if(playerOne){
               
                dashboard[r][c] = "X";
                used++;
                if(checkWinning(dashboard,"X")){
                    console.log("Player X wins!");
                  
                    break;
                }
                playerOne = false;
            }else{
               
                dashboard[r][c] = "O";
                used++;
                if(checkWinning(dashboard,"O")){
                    console.log("Player O wins!");
                   
                    break;
                }
                playerOne = true;
            }
            if(used == 9){
            console.log("The game ended! Nobody wins :(");
            break;
            }
        }
           
         
         
        printDashboard(dashboard);
        

        function printDashboard(dashboard){
            for(let i=0;i<dashboard.length;i++){
                
                   console.log(dashboard[i].join("\t"));
                    
                
            }
        }
        function checkWinning(dashboard,playerSym){
             if(checkHorizontal(dashboard,playerSym) || checkVertical(dashboard,playerSym) || checkDiagonal(dashboard,playerSym)){
                 return true;
             }
             return false;
        }
        function checkHorizontal(dashboard,playerSym){
            let winning = false;
            
            for(let i=0;i<dashboard.length;i++){
                
                if(dashboard[i][0] == playerSym){
                    let allEqual = true;
                    for (let j = 1; j < dashboard[i].length; j++) {
                        if(dashboard[i][j] != playerSym){
                            allEqual = false;
                            break;
                        }
                    }
                    if(allEqual){
                        winning = true;
                        break;
                    }
                }
                
              
            }
            return winning;
        }
        function checkVertical(dashboard,playerSym){
            let winning = false;
            
            for(let i=0;i<dashboard[0].length;i++){
                
                if(dashboard[0][i] == playerSym){
                    let allEqual = true;
                    for (let j = 1; j < dashboard.length; j++) {
                        if(dashboard[j][i] != playerSym){
                            allEqual = false;
                            break;
                        }
                    }
                    if(allEqual){
                        winning = true;
                        break;
                    }
                }
                
              
            }
            return winning;
        }
        function checkDiagonal(dashboard,playerSym){
           
            if(dashboard[0][0] == playerSym && dashboard[1][1] == playerSym && dashboard[2][2] == playerSym){
                return true;
            }
            if(dashboard[2][0] == playerSym && dashboard[1][1] == playerSym && dashboard[0][2] == playerSym){
                return true;
            }   
            return false;    
        }
    }

    play(["0 1",
 "0 0",
 "0 2",
 "2 0",
 "1 0",
 "1 2",
 "1 1",
 "2 1",
 "2 2",
 "0 0"]);
