function getInfo() {
    let stopId = document.getElementById("stopId").value;
    let busList = document.getElementById('buses');
  
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