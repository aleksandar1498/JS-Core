class Task{
	constructor(title,deadline){
		this.title = title;
		this.deadline = deadline;
		this.status = 'Open'; //Open
		
	}
	get deadline(){
		return this._deadline;
	}
	set deadline(deadline){
		let now = Date.now();
		if(deadline < now){
			throw Error("You are not allowed to set time in the past");
		}
		this._deadline = deadline;
	}
	
	 _getStatusIcon(s) {
        switch (s) {
            case "Open":
                return "\u2731"
                break;
            case "In Progress":
                return "\u219D"
                break;
            case "Complete":
                return "\u2714"
                break;
            case "Overdue":
                return "\u26A0"
                break;
        }
    }
	static comparator(a, b) {
        let rankA = a.isOverdue() ? 0 : getRank(a.status);
        let rankB = b.isOverdue() ? 0 : getRank(b.status);
        if (rankA - rankB !== 0) {
            return rankA - rankB;
        }
        return a.deadline - b.deadline;

        function getRank(r) {
            switch (r) {
                case "Open":
                    return 2
                    break;
                case "In Progress":
                    return 1
                    break;
                case "Complete":
                    return 3
                    break;
            }
        }
    }
	 get isOverdue(){
		return this.deadline < Date.now() && this.status !== 'Complete';
	}
	toString(){
		if(this.isOverdue){
			return `[${this._getStatusIcon('Overdue')}] ${this.title} (overdue)`;
		}else if(this.status == 'Complete'){
			return `[${this._getStatusIcon('Complete')}] ${this.title})`;
		}
		return `[${this._getStatusIcon(this.status)}] ${this.title} (${'deadline: '+this.deadline})`;
	}

}