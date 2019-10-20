
class Organization{
	constructor(name,budget){
		this.name = name;
		this.budget = budget;
		this.departments = {
			marketing :  budget *.4,
			finance : budget *.25,
			production : budget *.35,
		}
		
		this.employees = [];
	}
	get departmentsBudget(){
		return {
			marketing :  this.departments.marketing,
			finance :  this.departments.finance,
			production :  this.departments.production,
		}
	}
	add(employeeName,department,salary){
		if(this.departmentsBudget[department] < salary){
			return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is ${this.departmentsBudget[department]}.`;
		}
		let employee = {
			employeeName : employeeName,
			department : department,
			salary : salary
		}
		this.employees.push(employee);
		this.departmentsBudget[department]=this.departmentsBudget[department]-salary;
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
		this.departmentsBudget[employee['department']]=this.departmentsBudget[employee['department']]+employee['salary'];
		this.employees = this.employees.filter(x => x['employeeName'] != employeeName);
		return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
	}
	status(){
		let result = `${this.name.toUpperCase()} DEPARTMENTS:\n`;
		let marketingEmployees = this.employees.filter(x => x['department'] == 'marketing').sort((a,b) => { return b['salary'] - a['salary']});
		let financeEmployees = this.employees.filter(x => x['department'] == 'finance').sort((a,b) => { return b['salary'] - a['salary']});
		let productionEmployees = this.employees.filter(x => x['department'] == 'production').sort((a,b) => { return b['salary'] - a['salary']});
		result+=`\nMarketing | Employees: ${marketingEmployees.length}: ${marketingEmployees.map(e => e['employeeName'] ).join(", ")} |  Remaining Budget: ${this.departmentsBudget['marketing']}`
		result+=`\nFinance| Employees: ${financeEmployees.length}: ${financeEmployees.map(e => e['employeeName'] ).join(", ")} |  Remaining Budget: ${this.departmentsBudget['finance']}`
		result+=`\nProduction | Employees: ${productionEmployees.length}: ${productionEmployees.map(e => e['employeeName'] ).join(", ")} |  Remaining Budget: ${this.departmentsBudget['production']}`

		return result;
	}

}
let org = new Organization("HoneyWell",100);
console.log(org.departmentsBudget);
console.log(org.add("vesi","marketing",10));
console.log(org.add("qna","marketing",15));

console.log(org.status());

