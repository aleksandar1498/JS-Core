class LineManager {
    constructor(stops) {
        this.stops = stops;
        this.currentStop = 0;
        this.duration = 0;
        this.expected = 0;
    }
    set stops(stops) {
        stops.forEach((stop) => {
            if (stop.name === '' || typeof stop.name !== 'string') {
                throw new Error('stop name must be a string');
            }
        });

        stops.forEach((stop) => {
            if (stop.timeToNext < 0 || typeof stop.timeToNext !== 'number') {
                throw new Error('stop timeToNext must be a number');
            }
        });

        this._stops = stops;
    }
    get stops() {
        return this._stops;
    }
    get atDepot() {
        return this.currentStop == this.stops.length - 1;
    }
    get nextStopName() {
        return (this.currentStop + 1 < this.stops.length) ? this.stops[this.currentStop + 1].name : 'At depot.';
    }
    get currentDelay() {
        return  this.duration - this.expected;
    }
    arriveAtStop(minutes) {
        if(minutes < 0){
            throw new Error('minutes cannot be negative');
        }
        if (this.atDepot) {
            throw new Error('last stop reached');
        }
        this.duration+= minutes;
        this.expected+=this.stops[this.currentStop].timeToNext;
        this.currentStop++;
        return !this.atDepot;
    }
    toString() {
        let output = ['Line summary'];
        output.push((this.nextStopName === 'At depot.')?'- Course completed':`- Next stop: ${this.nextStopName}`);
        output.push(`- Stops covered: ${this.currentStop}`);
        output.push(`- Time on course: ${this.duration} minutes`);
        output.push(`- Delay: ${this.currentDelay} minutes`);
        return output.join('\n');
    }
}
// Initialize a line manager with correct values
const man = new LineManager([
    { name: 'Depot', timeToNext: 4 },
    { name: 'Romanian Embassy', timeToNext: 2 },
    { name: 'TV Tower', timeToNext: 3 },
    { name: 'Interpred', timeToNext: 4 },
    { name: 'Dianabad', timeToNext: 2 },
    { name: 'Depot', timeToNext: 0 },
]);

// Travel through all the stops until the bus is at depot
while (man.atDepot === false) {
    console.log(man.toString());
    man.arriveAtStop(4);
}

console.log(man.toString());
