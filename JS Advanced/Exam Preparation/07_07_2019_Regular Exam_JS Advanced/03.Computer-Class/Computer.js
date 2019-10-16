
//rado3000
class Computer {
   constructor (ramMemory,cpuGHz,hddMemory){
	this.ramMemory = ramMemory;
	this.cpuGHz = cpuGHz;
	this.hddMemory = hddMemory;
	this.totalRamUsage = 0;
    this.totalCpuUsage = 0;
	this.taskManager = [];
	this.installedPrograms = [];
   }
   
   installAProgram(name, requiredSpace){
	   if(requiredSpace > this.hddMemory){
			throw new Error("There is not enough space on the hard drive");
	   }
	   let program = {
			name : name,
			requiredSpace : requiredSpace
	   }
	   this.decreaseHddMemory(requiredSpace);
	   this.installedPrograms.push(program);
	   return program;
   }
   uninstallAProgram(name){
	const findProgram = this.installedPrograms.find((p) => p.name === name);
	   if(findProgram == false){
		throw new Error("Control panel is not responding");
	   }
	   let indexProgram = this.installedPrograms.findIndex(p => p.name === name);
	   this.installedPrograms.splice(indexProgram,1);
	   this.increaseHddMemory(findProgram.requiredSpace);
	   return this.installedPrograms;
   }
  
   
   
   openAProgram(name){
   console.log(name);
		if(this.isInstalled(name) == false){
			throw new Error( `The ${name} is not recognized`);
		}
		if(this.isOpened(name)){
			throw new Error(`The ${name} is already open`);
		}
		let program = this.installedPrograms.find(p => p['name'] == name);
		let ramUsage = (program['requiredSpace'] / this.ramMemory) * 1.5;
		let cpuUsage = ((program['requiredSpace'] / this.cpuGHz)/500) * 1.5;
		this.totalRamUsage+=ramUsage;
		this.totalCpuUsage+=cpuUsage;
		if(this.totalRamUsage >= 100){
			throw new Error(`${name} caused out of memory exception`);
		}
		if(this.totalCpuUsage >= 100){
			throw new Error(`${name} caused out of cpu exception`);
		}
		let programOpened = {
			name : name,
			ramUsage : ramUsage,
			cpuUsage : cpuUsage,
		}
		this.taskManager.push(programOpened);
		
		return programOpened;
   }
   
   taskManagerView(){
	if(this.taskManager.length == 0){
		return "All running smooth so far";
	}
	
		return Array.from(this.taskManager).map(p => `Name - ${p['name']} | Usage - CPU: ${p['cpuUsage'].toFixed(0)}%, RAM: ${p['ramUsage'].toFixed(0)}%`).join("\n");
	
	
   }
   decreaseHddMemory(neededMemory){
	   this.hddMemory-=neededMemory;
   }
   increaseHddMemory(neededMemory){
	   this.hddMemory+=neededMemory;
   }
   isInstalled(program){
    return (this.installedPrograms.find(p => p['name'] == program))?true:false;
   }
   isOpened(program){
	return (this.taskManager.find(p => p['name'] == program))?true:false;
   }
   
}

let computer = new Computer(4096, 7.5, 250000);

// act
computer.installAProgram('Word', 7300);
computer.installAProgram('Excel', 10240);
computer.installAProgram('PowerPoint', 12288);
computer.uninstallAProgram('Word');
computer.installAProgram('Solitare', 1500);

computer.openAProgram('Excel');
computer.openAProgram('Solitare');
console.log(computer.taskManagerView());
