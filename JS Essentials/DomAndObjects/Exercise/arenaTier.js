function arena(input){
			let soldiers = {};
			for(let action of input){
				if(action == "Ave Cesar"){
					break;
				}
				if(action.includes("vs")){
					action = action.split(" vs ");
					let firstSoldier = action[0];
					let secondSoldier = action[1];
					fight(soldiers,firstSoldier,secondSoldier);
				}else{
					action = action.split(" -> ");
					let name = action[0];
					let tech = action[1];
					let skill = Number(action[2]);
					if(!soldiers[name]){
						soldiers[name] = {};
					}
					if(!soldiers[name][tech]){
						soldiers[name][tech] = skill;
					}else{
						if(skill > soldiers[name][tech]){
							soldiers[name][tech] = skill;
						}
					}
					
				}
			}
			Array.from(Object.entries(soldiers))
				.sort((a,b) => {
					let sort = totSkill(b[1]) - totSkill(a[1]);
					if(sort == 0){
						sort = a[0].localeCompare(b[0]);
					}
					return sort;
				})
				.forEach((a) => {
					console.log(`${a[0]}: ${totSkill(a[1])} skill`);
					Array.from(Object.entries(a[1]))
						.sort((a,b) => {
							let sort = b[1] - a[1];
							if(sort == 0){
								sort = a[0].localeCompare(b[0]);
							}
							return sort;
						}).forEach(x => {
							console.log(`- ${x[0]} <!> ${x[1]}`);
						});
				});
				
				
			
			
			function totSkill(techs){
				return Array.from(Object.values(techs)).reduce((a,c) => a+c,0);
			}
			
			function fight(soldiers,left,right){
			console.log();
				if(!soldiers[left] || !soldiers[right]){
					return;
				}
				let commonTech = Object.keys(soldiers[left]).filter(r => Object.keys(soldiers[right]).indexOf(r) >= 0);
				if(commonTech.length == 0){
					return;
				}
				if(totSkill(soldiers[left]) > totSkill(soldiers[right])){
					delete soldiers[right];
				}else if(totSkill(soldiers[right]) > totSkill(soldiers[left])){
					delete soldiers[left];
				}
				
			}
		}