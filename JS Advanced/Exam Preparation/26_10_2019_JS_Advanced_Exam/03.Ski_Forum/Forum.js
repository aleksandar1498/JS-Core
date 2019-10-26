class Forum {
    constructor() {
        this._users = [];
        this._questions = [];
        this._id = 1;
    }
    register(username, password, repeatPassword, email) {
       
        if (username == '' || password == '' || repeatPassword == '' || email == '') {
            throw new Error('Input can not be empty');
        }
        if (password != repeatPassword) {
            throw new Error('Passwords do not match');
        }
        if(this._users.some(user => user.username == username)){
            throw new Error('This user already exists!');
        }
        this._users.push({username,password});

        return `${username} with ${email} was registered successfully!`;

    }
    login(username,password){
        let user = this._users.find(user => user.username == username);
        if(!user){
            throw new Error('There is no such user');
        }
        if(user.password == password){
            user.logged = true;
            return 'Hello! You have logged in successfully';
        }
    }
    logout(username,password){
        let user = this._users.find(user => user.username == username && user.logged == true);
        if(!user){
            throw new Error('There is no such user');
        }
        if(user.password == password){
            user.logged = false;
            return 'You have logged out successfully';
        }
    }

    postQuestion(username, question){
        let user = this._users.find(user => user.username == username && user.logged == true);
    
        if(!user){
            throw new Error('You should be logged in to post questions');
        }
        if(question == ""){
            throw new Error("Invalid question");
        }
        let questionId = this._id;
        let questionObj = {
            questionId,
            username,
            question,
            answers:[]
        };
        this._questions.push(questionObj);
        this._id++;
        return 'Your question has been posted successfully';

    }
    postAnswer(username, questionId,answer){
        let user = this._users.find(user => user.username == username && user.logged == true);
    
        if(!user){
            throw new Error('You should be logged in to post answers');
        }
        if(answer == ""){
            throw new Error("Invalid answer");
        }
        let questionIndex = this._questions.findIndex(q => q.questionId == questionId);
        if(questionIndex < 0){
            throw new Error('There is no such question');
        } 
        this._questions[questionIndex].answers.push({username,answer});
        return 'Your answer has been posted successfully';
    }
    showQuestions(){
        let output = [];
        for(const question of this._questions){
            output.push(`Question ${question.questionId} by ${question.username}: ${question.question}`);
            for(const answer of question.answers){
                output.push(`---${answer.username}: ${answer.answer}`);
            }
        }
        return output.join('\n');
    }

}
let forum = new Forum();

console.log(forum.register('Jonny', '12345', '12345', 'jonny@abv.bg'));
console.log(forum.login('Jonny', '12345'));
console.log(forum.logout('Jonny', '12345'));
