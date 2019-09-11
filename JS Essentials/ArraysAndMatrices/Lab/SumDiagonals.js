function diagonalSum(matrix){
		let sumFirstDiagonal = 0;
		let sumSecondDiagonal = 0;
		let k = matrix[0].length-1;
		for(let i = 0 ; i < matrix.length ; i++){
			for(let j = 0 ; j < matrix[i].length ; j++){
				if(i == j){
					sumFirstDiagonal+=matrix[i][j];
				}
			}
			sumSecondDiagonal+=matrix[i][k];
			k--;
		}
	}