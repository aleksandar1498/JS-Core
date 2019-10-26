class PublicTransportTable{
	constructor(city){
		this.tableBody = document.getElementsByClassName('vehicles-info')[0];
		this.changeTableName(city);
		this.addSearchFunctionality();
		this.addClearFunctionality();
	}
	addVehicle(vehicleObj){
		this.tableBody.appendChild(this.createMainInfoRow(vehicleObj));
	}
	
	createMainInfoRow(vehicleObj){
		let row = document.createElement('tr');
		row.appendChild(this.createColumn(vehicleObj.type));
		row.appendChild(this.createColumn(vehicleObj.name));
		row.appendChild(this.createColumn(this.createButton('More',vehicleObj)));
		return row;
	}
	createColumn(content){
		let col = document.createElement('td');
		if(content instanceof HTMLElement){
			col.appendChild(content);
		}else{
			col.innerHTML = content;
		}
		
		return col;
	}
	createButton(content,data){
		let btn = document.createElement('button');
		btn.innerHTML = content;
		btn.addEventListener('click',function(evt){
			let current = evt.target;
			PublicTransportTable.prototype.toggleData.call(current,data);
		});
		return btn;
	}
	toggleData(data){
		let currentRow = this.parentNode.parentNode;
		if(this.innerHTML == 'More'){
				this.innerHTML = 'Less Info';
				let infoRow = PublicTransportTable.prototype.createInfoRow(data);
				console.log(infoRow);
				currentRow.insertAdjacentElement('afterend', infoRow);
			}else{
				this.innerHTML = 'More';
				currentRow.nextSibling.remove();
		}
		
	}
	createInfoRow(data){
		let row = document.createElement('tr');
		row.classList.add('more-info');
		let col = document.createElement('td');
		col.setAttribute('colspan','3');
		col.innerHTML = `<table>
		<tbody>
		<tr>
            <td>Route - ${data.route}</td>
		</tr>
		<tr>
            <td>Price - ${data.price}</td>
		</tr>
		<tr>
			<td>Driver - ${data.driver}</td>
		</tr>
             
        
	  </tbody>`;
		row.appendChild(col);
		return row;
	}
	changeTableName(city){
		let capt = document.getElementsByTagName('caption')[0];
		capt.innerHTML = capt.innerHTML.replace(/({Town name})/,city);
	}
	addSearchFunctionality(){
		let searchBtn = document.getElementsByClassName("search-btn")[0];
		let typeInput = searchBtn.parentElement.previousElementSibling.previousElementSibling.getElementsByTagName('input')[0];
	
		let nameInput = searchBtn.parentElement.previousElementSibling.getElementsByTagName('input')[0];
		let rows = searchBtn.parentElement.parentElement.parentElement.nextElementSibling.getElementsByTagName("tr");
		searchBtn.addEventListener('click',()=>{
			if(typeInput.value == '' && nameInput.value == ''){
				return;
			}
			//This is removing also those that has not to be removed
			PublicTransportTable.prototype.hideAdditionalInformation.call(searchBtn,rows);
		
			
			if(typeInput.value != ''){
				this.showResultingRows(rows,'none',row => {
					return !row.firstChild.textContent.includes(typeInput.value)
				});
			}
			
			if(nameInput.value != ''){
				this.showResultingRows(rows,'none',row => {
					return !row.firstChild.textContent.includes(nameInput.value)
				});
			}
			
			
			
		});
	}
	
	addClearFunctionality(){
		let clearBtn = document.getElementsByClassName("clear-btn")[0];
		let rows = clearBtn.parentElement.parentElement.parentElement.nextElementSibling.getElementsByTagName("tr");
		clearBtn.addEventListener('click',()=>{
			PublicTransportTable.prototype.hideAdditionalInformation.call(clearBtn,rows);
			this.showResultingRows(rows,'');
			Array.from(rows).forEach(r => r.style.display = '');	
		});
	}
	showResultingRows(rows,state,filt){
		if(typeof filt != 'undefined'){
			Array.from(rows).filter(filt).forEach(r => r.style.display = state);
			return;			
		}
		Array.from(rows).forEach(r => r.style.display = state);
	}
	hideAdditionalInformation(rows){
		
		Array.from(rows).filter(row => row.classList.contains('more-info')).forEach(r => {
				r.previousElementSibling.lastElementChild.firstChild.innerHTML = 'More';
				r.remove();	
			});
	}

}