
class VeterinaryClinic {
    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.clients = [];
        this.totalProfit = 0;
        this.workLoad = 0;
    }

    newCustomer(ownerName, petName, kind,procedures) {
        if (this.workLoad + 1 > this.capacity) {
            throw new Error("Sorry, we are not able to accept more patients!");
        }
        const client = this.clients.find(c => c.name === ownerName);
        if (!client) {
            this.clients.push({
                name: ownerName,
                pets: [
                    {
                        name: petName,
                        kind: kind,
                        procedures: procedures
                    }
                ]
            });
        } else {
            const pet = client.pets.find(p => p.name === petName);
            if (!pet || pet.procedures.length == 0) {
                client.pets.push({
                    name: petName,
                    kind: kind,
                    procedures: procedures
                });
            } else {
                throw new Error(`This pet is already registered under ${client.name} name! ${pet.name} is on our lists, waiting for ${pet.procedures.join(", ")}.`);
            }
        }
        this.workLoad++;
        return "Welcome " + petName+"!";
    }
    onLeaving(ownerName, petName) {
        const client = this.clients.find(c => c.name === ownerName);
        if (!client) {
            throw new Error("Sorry, there is no such client!");
        }
        const pet = client.pets.find(p => p.name === petName);
        if (!pet || pet.procedures.length == 0) {
            throw new Error("Sorry, there are no procedures for " + petName+"!");
        }
        this.totalProfit += pet.procedures.length * 500;
        pet.procedures = [];
        this.workLoad--;
        return "Goodbye " + pet.name + ". Stay safe!";
    }
    toString(){
        let response = `${this.clinicName} is ${Math.floor((this.workLoad/this.capacity)*100)}% busy today!\n`
        +`Total profit: ${this.totalProfit.toFixed(2)}$`; 
        for(var ownerKey of Object.keys(this.clients.sort((a,b) => a.name.localeCompare(b.name)))){
            console.log(ownerKey)
            const currentClient = this.clients[ownerKey];
            response = response.concat(`\n${currentClient.name} with:`);
            var petsCurrent = currentClient.pets;
            for(var petKey of Object.keys(petsCurrent.sort((a,b) => a.name.localeCompare(b.name)))){
                const pet = petsCurrent[petKey];
                response = response.concat(`\n---${pet.name} - a ${pet.kind.toLowerCase()} that needs: ${pet.procedures.join(", ")}`);
            }
        }
        return response;
    }
}