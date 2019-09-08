function timeTaken(steps,length,speed) {
let distanceInKm = (steps * length)/1000;
let takenTimeInSeconds = Math.ceil((distanceInKm*3600)/speed) + Math.floor(distanceInKm/.5)*60;
let h = Math.floor(takenTimeInSeconds/3600);
h = ("0" + h).slice(-2);
takenTimeInSeconds-=h*3600;
let m = Math.floor(takenTimeInSeconds/60);
m = ("0" + m).slice(-2);
takenTimeInSeconds-=m*60;
let s = takenTimeInSeconds;
s = ("0" + s).slice(-2);
console.log(`${h}:${m}:${s}`);
	}