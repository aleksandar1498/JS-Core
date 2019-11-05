function solve() {
    const infoBox = document.querySelector("#id span");
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let [current,nextStopId] = ['',''];
    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/{currentId}.json`)
        toggleButtons(departBtn,arriveBtn);
    }

    function arrive() {
        toggleButtons(departBtn,arriveBtn);
    }

    function toggleButtons(...btns){
        for (const btn of btns) {
            toggleState(btn);
        }
    }
    function toggleState(btn){
       if(btn.hasAttribute('disabled')){
            btn.removeAttribute('disabled');
       } else{
            btn.setAttribute('disabled','true');
       }
    }
    return {
        depart,
        arrive
    };
}

let result = solve();