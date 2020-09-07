function solve() {
    let addContainer = document.getElementById("container");
    let addBtn = addContainer.getElementsByTagName("button")[0];
    let formFields = addContainer.getElementsByTagName("input");

    addBtn.addEventListener("click", (event) => {
        addPet(formFields, event)
    });

    function addPet(formFields, event) {
        event.preventDefault();
        //clearForm(formFields);
        const form = {
            name: formFields[0].value,
            age: formFields[1].value === "" ? NaN : Number(formFields[1].value),
            kind: formFields[2].value,
            currentOwner: formFields[3].value
        }

        if (!isFormValid(form)) {
            clearForm(formFields);
            return;
        }
        createItem(form);
        clearForm(formFields);
    }

    function clearForm(fields) {
        for (let field of fields) {
            field.value = "";
        }
    }
    function isFormValid(form) {
        for (const key of Object.keys(form)) {
            if (!form[key]) {
                return false;
            }
        }
        return true;
    }

    function createItem(form) {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const strongName = document.createElement("strong");
        strongName.innerHTML = form.name;
        const strongAge = document.createElement("strong");
        strongAge.innerHTML = form.age;
        const strongKind = document.createElement("strong");
        strongKind.innerHTML = form.kind;

        p.append(strongName, " is a ", strongAge, " year old ", strongKind);

        const span = document.createElement("span");
        span.innerText = "Owner " + form.currentOwner;

        const div = document.createElement("div");

        const input = document.createElement("input");
        input.placeholder = "Enter your names";

        const button = document.createElement("button");
        button.innerText = "Yes! I take it";
        button.addEventListener("click", (event) => {
            const current = event.target;
            console.log(current);
            if(!current.previousElementSibling.value){
                return;
            }
            form.currentOwner = current.previousElementSibling.value;
            current.parentElement.parentElement.remove();
            takePet(form);
        });

        div.append(input, button);

        li.append(p, span, div);

        document.getElementsByTagName("ul")[0].appendChild(li);
    }

    function takePet(pet) {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const strongName = document.createElement("strong");
        strongName.innerHTML = pet.name;
        const strongAge = document.createElement("strong");
        strongAge.innerHTML = pet.age;
        const strongKind = document.createElement("strong");
        strongKind.innerHTML = pet.kind;

        p.append(strongName, " is a ", strongAge, " year old ", strongKind);
        const span = document.createElement("span");
        span.innerText = "New Owner " + pet.currentOwner;

        const div = document.createElement("div");

        const button = document.createElement("button");
        button.innerText = "Checked";
        button.addEventListener("click", (event) => {
            const current = event.target;
            current.parentElement.parentElement.remove();
        });

        div.append( button);

        li.append(p, span, div);

        document.getElementsByTagName("ul")[1].appendChild(li);
    }
}


