
class Organization{
	constructor(name,budget){
		this.name = name;
		this.budget = budget;
		this.departmentsBudget = {
			marketing :  budget *.4,
			finance : budget *.25,
			production : budget *.35,
		}
		
		this.employees = [];
	}
	get departmentsBudget(){
		return this._departmentsBudget;
	}
	set departmentsBudget(departments) {
        this._departmentsBudget = departments;
    }
	add(employeeName,department,salary){
		if(this.departmentsBudget[department] < salary){
			return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departmentsBudget[department]}.`;
		}
		let employee = {
			employeeName : employeeName,
			department : department,
			salary : salary
		}
		this.employees.push(employee);
		this.departmentsBudget[department]-=salary;
		return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`;
		
	}
	employeeExists(employeeName){
		let employee  = this.employees.find(x => x['employeeName'] == employeeName);
		if(!employee){
			return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
		}
		return `Mr./Mrs. ${employee['employeeName']} is part of the ${employee['department']} department.`;
		
	}
	leaveOrganization(employeeName){
		let employee  = this.employees.find(x => x['employeeName'] == employeeName);
		if(!employee){
			return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
		}
		this.departmentsBudget[employee['department']]+=employee['salary'];
		this.employees = this.employees.filter(x => x['employeeName'] != employeeName);
		return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
	}
	status(){
		let result = [`${this.name.toUpperCase()} DEPARTMENTS:`];
		let marketingEmployees = this.employees.filter(x => x['department'] == 'marketing').sort((a,b) => { return b['salary'] - a['salary']}).map(e => e['employeeName'] ).join(", ");
		let financeEmployees = this.employees.filter(x => x['department'] == 'finance').sort((a,b) => { return b['salary'] - a['salary']}).map(e => e['employeeName'] ).join(", ");
		let productionEmployees = this.employees.filter(x => x['department'] == 'production').sort((a,b) => { return b['salary'] - a['salary']}).map(e => e['employeeName'] ).join(", ");
		result.push(`Marketing | Employees: ${this.employees.filter(x => x['department'] == 'marketing').length}: ${marketingEmployees} |  Remaining Budget: ${this.departmentsBudget['marketing']}`);
		result.push(`Finance| Employees: ${this.employees.filter(x => x['department'] == 'finance').length}: ${financeEmployees} |  Remaining Budget: ${this.departmentsBudget['finance']}`);
		result.push(`Production | Employees: ${this.employees.filter(x => x['department'] == 'production').length}: ${productionEmployees} |  Remaining Budget: ${this.departmentsBudget['production']}`);

		return result.join("\n");
	}

}
let org = new Organization("HoneyWell",100);
console.log(org.departmentsBudget);
console.log(org.add("vesi","marketing",10));
console.log(org.add("qna","marketing",15));

console.log(org.status());

