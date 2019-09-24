let post = {
    id: '1234',
    author: 'author name',
    content: 'these fields are irrelevant',
    upvotes: 4,
    downvotes: 5
};
let solution = (function(){
	return function perform(operation){
		switch(operation){
			case "upvote":
				this.upvotes++;
			break;
			case "downvote":
				this.downvotes++;
			break;
			case "score":
				let totVotes = this.upvotes+this.downvotes;
				
				if(totVotes < 10){
					let balance  = this.upvotes-this.downvotes;
					return [this.upvotes,this.downvotes,balance,"new"];
				}else if(totVotes <= 50){
					let balance  = this.upvotes-this.downvotes;
					if(balance < 0){
						return [this.upvotes,this.downvotes,balance,"unpopular"];
					}else if((this.upvotes*100)/totVotes >= 66){
						return [this.upvotes,this.downvotes,balance,"hot"];
					}else{
						return [this.upvotes,this.downvotes,balance,"new"];
					}
					
					
				}else if(totVotes < 100){
					let inflation = Math.max(this.upvotes,this.downvotes)*.25;
					let balance  = (this.upvotes+inflation)-(this.downvotes+inflation);
					if(balance < 0){
						return [Math.ceil(this.upvotes+inflation),Math.ceil(this.downvotes+inflation),balance,"unpopular"];
					}else if((this.upvotes*100)/totVotes >= 66){
						return [Math.ceil(this.upvotes+inflation),Math.ceil(this.downvotes+inflation),balance,"hot"];
					}else{
						return [Math.ceil(this.upvotes+inflation),Math.ceil(this.downvotes+inflation),balance,"new"];
					}
				}else{
					let inflation = Math.max(this.upvotes,this.downvotes)*.25;
					let balance  = (this.upvotes+inflation)-(this.downvotes+inflation);
					if(balance < 0){
						return [Math.ceil(this.upvotes+inflation),Math.ceil(this.downvotes+inflation),balance,"unpopular"];
					}else if((this.upvotes*100)/totVotes > 66){
						return [Math.ceil(this.upvotes+inflation),Math.ceil(this.downvotes+inflation),balance,"hot"];
					}else{
						return [Math.ceil(this.upvotes+inflation),Math.ceil(this.downvotes+inflation),balance,"controversial"];
					}
				}
			
		}
		
	}
})();