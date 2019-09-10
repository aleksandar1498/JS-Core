function equalNeighbors(matrix){
		let equalNeighbor = 0;
		
		for(let i = 0 ; i < matrix.length ; i++){
			for(let j = 0 ; j < matrix[i].length; j++){
				if(j+1 < matrix[i].length && matrix[i][j] == matrix[i][j+1]){
					equalNeighbor++;
				}
				
				
				if(i+1 < matrix.length && matrix[i][j] == matrix[i+1][j]){
					equalNeighbor++;
				}
				
			}
			
		}
		console.log(equalNeighbor);
	}