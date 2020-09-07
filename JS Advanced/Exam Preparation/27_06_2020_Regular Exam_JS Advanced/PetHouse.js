function solveClasses() {
    class Pet {
        constructor(owner, name) {
            this.owner = owner;
            this.name = name;
            this.comments = [];
        }

        addComment(comment) {
            if (this.comments.includes(comment)) {
                throw new Error(`This comment is already added!`);
            }
            this.comments.push(comment);
            return "Comment is added.";
        }

        feed() {
            return this.name + " is fed";
        }

        toString() {
            let response = "Here is " + this.owner + "'s pet " + this.name + ".";
            if (this.comments.length > 0) {
                response = response.concat("\n", "Special requirements: " + this.comments.join(", "));
            }
            return response;
        }
    }

    class Cat extends Pet {
        constructor(owner, name, insideHabits, scratching) {
            super(owner, name);
            this.insideHabits = insideHabits;
            this.scratching = scratching;
        }

        feed() {
            return super.feed().concat(", happy and purring.");
        }

        toString() {
            let response = super.toString() + `\nMain information:\n` +
                `${this.name} is a cat with ${this.insideHabits}`;

            if (this.scratching == true) {
                response = response + `, but beware of scratches.`;
            }
            return response;
        }
    }

    class Dog extends Pet {
        constructor(owner, name, runningNeeds, trainability) {
            super(owner, name);
            this.runningNeeds = runningNeeds;
            this.trainability = trainability;
        }

        feed() {
            return super.feed().concat(", happy and wagging tail.");
        }

        toString() {
            return super.toString() + `\nMain information:\n` +
                `${this.name} is a dog with need of ${this.runningNeeds}km running every day and ${this.trainability} trainability.`;
        }
    }

    return {
        Pet,
        Cat,
        Dog
    }
}