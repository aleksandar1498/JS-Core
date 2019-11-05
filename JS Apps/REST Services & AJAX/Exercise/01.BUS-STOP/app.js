function getInfo() {
    //let xhr = new XMLHttpRequest();
    let stopId = document.getElementById("stopId").value;
    let busList = document.getElementById('buses');
    /*xhr.onreadystatechange = function () {
        if(this.readyState == 4){
            if(this.status == 200){
                let response = JSON.parse(this.responseText);
                changeName(response.name);
                showArrivingBuses(response.buses)
            }else{
                let response = JSON.parse(this.responseText);
                changeName("Error");
            }
            
        }
    }
    xhr.open("GET",`https://judgetests.firebaseio.com/businfo/${stopId}.json`);
    xhr.send();
    */
    fetch(`https://judgetests.firebaseio.com/businfo/${stopId}.json`)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
              
            }else if(response.status == 404){
                throw response;
            }
         
        })
        .then((data) => {
            changeName(data.name)
            showArrivingBuses(data.buses);
        })
        .catch((error) => displayError());

    function changeName(name) {
        document.getElementById("stopName").textContent = name;
    }
    function displayError() {
        busList.innerHTML = '';
        changeName("Error");
    }
    function showArrivingBuses(buses) {
       
        console.log(buses);
        for (const busId in buses) {
            busList.appendChild(createArrivingBusItem(busId, buses[busId]));
        }
    }
    function createArrivingBusItem(busId, time) {
        let li = document.createElement('li');
        li.innerHTML = `Bus ${busId} arrives in ${time}`;
        return li;
    }
}