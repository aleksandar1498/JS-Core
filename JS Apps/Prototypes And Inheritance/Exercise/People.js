function solve() {
    class Employee {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }
        getSalary() {
            return this.salary;
        }
       
        work() {
            let currentTask = this.tasks.shift();
            console.log(currentTask);
            this.tasks.push(currentTask);
        }
        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }


    }
    Employee.currentTask = 0;
    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            super.tasks = [`${name} is working on a simple task.`];
        }
    }
    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            super.tasks = [`${name} is working on a complicated task.`,
            `${name} is taking time off work.`,
            `${name} is supervising junior workers.`];
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            super.tasks = [`${name} scheduled a meeting.`,
            `${name} is preparing a quarterly report.`];
        }
        getSalary() {
            return this.salary+this.dividend;
        }
    }
    return {
        Employee, Junior, Senior, Manager
    }
}
let alex = solve();
let j = new alex.Junior("alex", 20);
console.log(j.work());
console.log(j.work());

