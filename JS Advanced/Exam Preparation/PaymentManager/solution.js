class PaymentManager{
	constructor (title){
		this.title = title;
	}
	
	render(id){
		let div = document.getElementById(id);
		let result = '';
		
		result+='<table>';
		result+=`<caption>${this.title} Payment Manager</caption>`;
		result+='<thead>';
		result+='<tr>';
		result+='<th class="name">Name</th>';
		result+='<th class="category">Category</th>';
		result+='<th class="price">Price</th>';
		result+='<th>Actions</th>';
		result+='</tr>';
		result+='</thead>';
		result+='<tbody class="payments">';
		result+='</tbody>';
		result+=`<tfoot class="input-data">`;
		result+=`<tr>`;
		result+=`<td><input name="name" type="text"></td>`;
		result+=`<td><input name="category" type="text"></td>`;
		result+=`<td><input name="price" type="number"></td>`;
		result+=`<td><button>Add</button></td></tr>`;
		result+=`</tr>`;
		result+=`</tfoot>`;
		result+='</table>';
		div.innerHTML = result;
		div.querySelector('button:last-child').addEventListener('click',addProduct);
		function addProduct(ev){
			let current = ev.target;
			let data = current.parentElement.parentElement.getElementsByTagName('input');
			
			let name = data[0];
			let category = data[1];
			let price = data[2];
			let row =  createTableRow(name.value,category.value,price.value);
			if(row){
				name.value = category.value = price.value = '';
				let paymentsDiv = div.getElementsByClassName('payments')[0];
				paymentsDiv.appendChild(row);
				
			}
		}
		function removeRow(ev){
			let current = ev.target;
			console.log("clicked");
			current.parentElement.parentElement.remove();
		}
		function createTableRow(name,category,price){
			if(!name || !category || !price){
				return null;
			}
			let trElement = document.createElement('tr');
			let tdName = document.createElement('td');
			tdName.innerHTML = name;
			let tdCat = document.createElement('td');
			tdCat.innerHTML = category;
			let tdPrice = document.createElement('td');
			tdPrice.innerHTML = Math.round(Number(price) * 100000) / 100000;
			let tdDelete = document.createElement('td');
			let btnDel = document.createElement('button');
			btnDel.addEventListener('click',removeRow);
			btnDel.innerHTML = 'Delete';
			tdDelete.appendChild(btnDel);
			trElement.appendChild(tdName);
			trElement.appendChild(tdCat);
			trElement.appendChild(tdPrice);
			trElement.appendChild(tdDelete);
			return trElement;
		}
	}
	
	
}