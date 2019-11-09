
function createComputerHierarchy() {
    class ComputerComponent {
        constructor(manufacturer) {
            if (new.target == ComputerComponent) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.manufacturer = manufacturer;
        }
    }
    class Keyboard extends ComputerComponent {
        constructor(manufacturer, responseTime) {
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }
    class Monitor extends ComputerComponent {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }
    class Battery extends ComputerComponent {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }
    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target == Computer) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.manufacturer = manufacturer;
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }
    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }
        get battery() {
            return this._battery;
        }
        set battery(bat) {
            if (bat instanceof Battery == false) {
                throw new TypeError("Battery should be instanceof Battery.class");
            }
            this._battery = bat;
        }
    }
    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;

        }
        get keyboard() {
            return this._keyboard;
        }
        get monitor() {
            return this._monitor;
        }

        set keyboard(keyboard) {
            if (keyboard instanceof Keyboard == false) {
                throw new TypeError("keyboard should be instanceof Keyboard.class");
            }
            this._keyboard = keyboard;
        }

        set monitor(monitor) {
            if (monitor instanceof Monitor == false) {
                throw new TypeError("monitor should be instanceof Monitor.class");
            }
            this._monitor = monitor;
        }
    }
    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }


}
function createMixins() {

    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3;
        }
        classToExtend.prototype.isFast = function () {
            return this.processorSpeed > (this.ram / 4);
        }
        classToExtend.prototype.isRoomy = function () {
            return this.hardDiskSpace > (Math.floor(this.ram * this.processorSpeed));
        }
    }
    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = function () {
            return this.manufacturer == this.keyboard.manufacturer && this.manufacturer == this.monitor.manufacturer;
        }
        classToExtend.prototype.isClassy = function () {
            return this.battery.expectedLife >= 3 && (this.color == 'Silver' || this.color == 'Black') && this.weight < 3;
        }

    }
    return {
        computerQualityMixin,
        styleMixin
    }

}
computerQualityMixin("Laptop");
