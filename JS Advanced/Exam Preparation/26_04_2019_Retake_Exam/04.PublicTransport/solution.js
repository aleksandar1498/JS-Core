class PublicTransportTable{
	constructor(city){
		this.tableBody = document.getElementsByClassName('vehicles-info')[0];
		this.changeTableName(city);
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
}