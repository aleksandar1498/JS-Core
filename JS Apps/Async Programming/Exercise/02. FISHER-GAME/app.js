function attachEvents() {
	let catches = document.getElementById("catches");
	let hr = document.createElement("hr");
	document.getElementsByClassName("add")[0].addEventListener('click',(evt)=> {
		const [angler, weight, species, location, bait, captureTime] = Array.from(evt.target.parentNode.children).filter((e) => e.value);
		if (!angler.value || !weight.value || !species.value || !location.value || !bait.value || !captureTime.value) {
				return;
        }
		const addCatch = {
            angler: angler.value,
            weight: Number(weight.value),
            species: species.value,
            location: location.value,
            bait: bait.value,
            captureTime: Number(captureTime.value)
        };
		fetch('https://fisher-game.firebaseio.com/catches.json',{
			method : 'post',
			body : JSON.stringify(addCatch),
			headers: {
                'Content-Type': 'application/json'
            }
		})
		.then(() => {
			[angler.value, weight.value, species.value] = ['', '', ''];
            [location.value, bait.value, captureTime.value] = ['', '', ''];
            loadData();
        }).catch(() => {

        });
		
	});
	document.getElementsByClassName("load")[0].addEventListener('click',()=> {
		catches.innerHTML = '';
		fetch('https://fisher-game.firebaseio.com/catches.json')
		.then(res => res.json())
		.then(data => {
			
				 Object.entries(data).forEach(([id, info]) => {
					const div = document.createElement('div');
					div.setAttribute('class', 'catch');
					div.setAttribute(`data-id`, id);

					const labelAngler = document.createElement('label');
					labelAngler.textContent = 'Angler';
					div.appendChild(labelAngler);
					
					
					
					const inputAngler = document.createElement('input');
					inputAngler.type = 'text';
					inputAngler.classList.add('angler');
					inputAngler.value = info.angler;
					div.appendChild(inputAngler);

					
					
					const labelWeight = document.createElement('label');
					labelWeight.textContent = 'Weight';
					div.appendChild(labelWeight);

					
					
					const inputWeight = document.createElement('input');
					inputWeight.type = 'number';
					inputWeight.classList.add('weight');
					inputWeight.value = info.weight;
					div.appendChild(inputWeight);

					
					
					const labelSpecies = document.createElement('label');
					labelSpecies.textContent = 'Species';
					div.appendChild(labelSpecies);

					
					
					const inputSpecies = document.createElement('input');
					inputSpecies.type = 'text';
					inputSpecies.classList.add('species');
					inputSpecies.value = info.species;
					div.appendChild(inputSpecies);

					
					
					const labelLocation = document.createElement('label');
					labelLocation.textContent = 'Location';
					div.appendChild(labelLocation);

					
					
					const inputLocation = document.createElement('input');
					inputLocation.type = 'text';
					inputLocation.classList.add('location');
					inputLocation.value = info.location;
					div.appendChild(inputLocation);

					
					
					const labelBait = document.createElement('label');
					labelBait.textContent = 'Bait';
					div.appendChild(labelBait);

					
					
					const inputBait = document.createElement('input');
					inputBait.type = 'text';
					inputBait.classList.add('bait');
					inputBait.value = info.bait;
					div.appendChild(inputBait);

					
					
					const labelCaptureTime = document.createElement('label');
					labelCaptureTime.textContent = 'Capture Time';
					div.appendChild(labelCaptureTime);

					
					
					const inputCaptureTime = document.createElement('input');
					inputCaptureTime.type = 'number';
					inputCaptureTime.classList.add('captureTime');
					inputCaptureTime.value = info.captureTime;
					div.appendChild(inputCaptureTime);

					
					
					const buttonUpdate = document.createElement('button');
					buttonUpdate.classList.add('update');
					buttonUpdate.textContent = 'Update';
					buttonUpdate.addEventListener('click', updateData);
					div.appendChild(buttonUpdate);

					
					
					const buttonDelete = document.createElement('button');
					buttonDelete.classList.add('delete');
					buttonDelete.textContent = 'Delete';
					buttonDelete.addEventListener('click', deleteData);
					div.appendChild(buttonDelete);

					catches.appendChild(div);
			});
			
		}).catch(err => console.log(err.message));
	});
	
	async function updateData(evt){
		let current = evt.target;
		let id = current.parentElement.dataset.id;
		await updateCatch(evt,id);
		document.getElementsByClassName("load")[0].click();
	}
	async function deleteData(evt){
		let current = evt.target;
		let id = current.parentElement.dataset.id;
		await removeCatch(id);
		
	}
	function removeCatch(catchId){
		fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`,{
			method : 'DELETE'
		})
		.then(res => {
			console.log(res);
			res.json();
			})
		.then(data => console.log(data));
	}
	function updateCatch(evt,id){
		const [angler, weight, species, location, bait, captureTime] = Array.from(evt.target.parentNode.children).filter((e) => e.value);
		if (!angler.value || !weight.value || !species.value || !location.value || !bait.value || !captureTime.value) {
				return;
        }
		const updateCatch = {
            angler: angler.value,
            weight: Number(weight.value),
            species: species.value,
            location: location.value,
            bait: bait.value,
            captureTime: Number(captureTime.value)
        };
		fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`,{
			method : 'put',
			body : JSON.stringify(updateCatch),
			headers: {
                'Content-Type': 'application/json'
            }
		})
		.then(() => {
			document.getElementsByClassName("load")[0].click();
        }).catch(() => {

        });
	}
}
attachEvents();
//document.getElementsByClassName("load")[0].click();
