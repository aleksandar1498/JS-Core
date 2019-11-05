function getInfo() {
    let xhr = new XMLHttpRequest();
    let stopId = document.getElementById("stopId").value;
    xhr.onreadystatechange = function () {
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
    function changeName(name){
        document.getElementById("stopName").innerHTML = name;
    }
    function showArrivingBuses(buses){
        let busList = document.getElementById('buses');
        console.log(buses);
        for (const busId in buses) {
            busList.appendChild(createArrivingBusItem(busId,buses[busId]));
        }
    }
    function createArrivingBusItem(busId,time){
        let li = document.createElement('li');
        li.innerHTML = `Bus ${busId} arrives in ${time}`;
        return li;
    }
}