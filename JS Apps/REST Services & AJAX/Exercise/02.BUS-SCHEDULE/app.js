function solve() {
    const infoBox = document.querySelector("#info span");
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let [currentName, nextStopId] = [undefined, 'depot'];
    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${nextStopId}.json`)
            .then((res) => {
             
                if (res.status == 200) {
                    return res.json();
                } else {
                    throw new Error('error');
                }

            })
            .then((data) => {
             
                currentName = data.name;
                nextStopId = data.next;
                infoBoxContent(`Next stop ${currentName}`);
                toggleButtons(departBtn, arriveBtn);
            })
            .catch(() => {
                handleError();
            });
        
    }

    function arrive() {
        infoBoxContent(`Arriving at ${currentName}`);
        toggleButtons(departBtn, arriveBtn);
    }

   
    function toggleButtons(...btns) {
        for (const btn of btns) {
            toggleState(btn);
        }
    }
    function toggleState(btn) {
        if (btn.hasAttribute('disabled')) {
            btn.removeAttribute('disabled');
        } else {
            btn.setAttribute('disabled', 'true');
        }
    }
    function handleError(){
        infoBoxContent("Error");
        departBtn.setAttribute('disabled','true');
        arriveBtn.setAttribute('disabled','true');
    }
    function infoBoxContent(content){
        infoBox.innerHTML = content;
    } 
    return {
        depart,
        arrive
    };
}

let result = solve();