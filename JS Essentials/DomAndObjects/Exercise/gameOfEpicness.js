<script>


    function battlefield(input){
		let kingdoms = {};
		for(const dom of input[0]){
			let kdom = dom.kingdom;
			let gen = dom.general;
			let arm = Number(dom.army);
			if(!kingdoms[kdom]){
				kingdoms[kdom] = {};
			}
			if(!kingdoms[kdom][gen]){
				kingdoms[kdom][gen] = {};
				kingdoms[kdom][gen]['army'] = 0;
				kingdoms[kdom][gen]['wins'] = 0;
				kingdoms[kdom][gen]['losses'] = 0;
			}
			kingdoms[kdom][gen]['army']= kingdoms[kdom][gen]['army'] + arm;
			
		}
		
		for(const battle of input[1]){
			let attackingKingdom=battle[0];
			let attackingGeneral=battle[1];
			let defKingdom=battle[2];
			let defGeneral=battle[3];
			
			if(attackingKingdom != defKingdom){
				if(!kingdoms[attackingKingdom][attackingGeneral] || !kingdoms[defKingdom][defGeneral]){
					continue;
				}
				if(kingdoms[attackingKingdom][attackingGeneral]['army'] > kingdoms[defKingdom][defGeneral]['army']){
					
					kingdoms[attackingKingdom][attackingGeneral]['army'] = Math.floor(kingdoms[attackingKingdom][attackingGeneral]['army']*1.1);
					
					kingdoms[attackingKingdom][attackingGeneral]['wins'] = kingdoms[attackingKingdom][attackingGeneral]['wins']+1;
					
					kingdoms[defKingdom][defGeneral]['army'] = Math.floor(kingdoms[defKingdom][defGeneral]['army']*.9);
					
					kingdoms[defKingdom][defGeneral]['losses'] = kingdoms[defKingdom][defGeneral]['losses']+1;
					
				}else if(kingdoms[attackingKingdom][attackingGeneral]['army'] < kingdoms[defKingdom][defGeneral]['army']){
					
					kingdoms[attackingKingdom][attackingGeneral]['army'] = Math.floor(kingdoms[attackingKingdom][attackingGeneral]['army']*.9);
					
					kingdoms[attackingKingdom][attackingGeneral]['losses'] = kingdoms[attackingKingdom][attackingGeneral]['losses']+1;
					
					kingdoms[defKingdom][defGeneral]['army'] = Math.floor(kingdoms[defKingdom][defGeneral]['army']*1.1);
					
					kingdoms[defKingdom][defGeneral]['wins'] = kingdoms[defKingdom][defGeneral]['wins']+1;
				}
			}
		}
		let winner = Array.from(Object.entries(kingdoms)).sort((a,b) => {
			let sort = totWins(b[1]) - totWins(a[1]);
			if(sort == 0){
				sort = totLosses(a[1]) - totLosses(b[1]);
				if(sort == 0){
					sort = a[0].localeCompare(b[0]);
				}
			}
			return sort;
		})[0];
		
		console.log(`Winner: ${winner[0]}`);
		Array.from(Object.entries(winner[1])).sort((a,b) => {
			
			return  b[1]['army'] - a[1]['army'];
			
		}).forEach(g => {
			console.log(`/\\general: ${g[0]}`);
			console.log(`---army: ${g[1]['army']}`);
			console.log(`---wins: ${g[1]['wins']}`);
			console.log(`---losses: ${g[1]['losses']}`);
		});
		

		function totWins(kingdom){
			let tot = 0;
			Object.values(kingdom).forEach(x => tot+=x['wins']);
			return tot;
		}
		function totLosses(kingdom){
			let tot = 0;
			Object.values(kingdom).forEach(x => tot+=x['losses']);
			return tot;
		}
	}
			
        battlefield(
		[[ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
  { kingdom: "Stonegate", general: "Ulric", army: 4900 },
  { kingdom: "Stonegate", general: "Doran", army: 70000 },
  { kingdom: "YorkenShire", general: "Quinn", army: 0 },
  { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
  { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
[ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
  ["Stonegate", "Ulric", "Stonegate", "Doran"],
  ["Stonegate", "Doran", "Maiden Way", "Merek"],
  ["Stonegate", "Ulric", "Maiden Way", "Merek"],
  ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ]

		]);
</script>