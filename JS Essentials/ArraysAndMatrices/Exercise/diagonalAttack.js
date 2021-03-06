function diagonalAttack(matrix){
	let coordinates = [];
	let sumFirstDiagonal = 0;
	let sumSecondDiagonal = 0;
	let k = matrix.length-1;
	let y = 0;
	for(let i = 0;i < matrix.length ;i++){
		matrix[i] = matrix[i].split(/\s+/g).map(Number);
		sumFirstDiagonal+=matrix[i][y];
		sumSecondDiagonal+=matrix[i][k];
		console.log(matrix[i][k]);
	    coordinates.push(`${i} ${k}`);
		coordinates.push(`${i} ${y}`);
		y++;
		k--;
	}
	
	if(sumFirstDiagonal == sumSecondDiagonal){
		for(let i = 0;i < matrix.length ;i++){
			for(let j = 0;j < matrix.length ;j++){
				if(coordinates.includes(`${i} ${j}`) == false){
					matrix[i][j] = sumFirstDiagonal;
				}
			}
		}
	}
	printMatrix();
	function printMatrix(){
		for(let row of matrix){
			console.log(row.join(" "));
		}
	}
}