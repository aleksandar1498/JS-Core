function attachEvents() {
    let person = document.getElementById("person");
    let phone = document.getElementById("phone");
    document.getElementById("btnLoad").addEventListener("click", function () {
        fetch("https://phonebook-nakov.firebaseio.com/phonebook.json")
            .then((res) => res.json())
            .then((data) => {
                createPhoneBook(data);
            })
            .catch((err) => {
                console.log(err);
            });

    });
    document.getElementById("btnCreate").addEventListener("click", function () {
        dataToSend = { "person": person.value, "phone": phone.value };
        fetch("https://phonebook-nakov.firebaseio.com/phonebook.json", {
            method: "post",
            body: JSON.stringify(dataToSend)
        })
            .then((res) => res.json())
            .then((data) => {
               person.value = '';
               phone.value = '';
               document.getElementById("btnLoad").click();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    function createPhoneBook(entries) {
        let ul = document.getElementById("phonebook");
        ul.innerHTML = '';
        for (const key in entries) {
            ul.appendChild(loadPhone(entries[key].person, entries[key].phone,key));
        }
    }
    function loadPhone(user, phone,key) {
        let li = document.createElement('li');
        li.innerHTML = `${user}:${phone}`;
        li.appendChild(createDeleteBtn(key));
        return li;
    }

    function createDeleteBtn(key) {
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", function () {
            fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`, {
                method: "delete",
                body: JSON.stringify(key)
            })
                .then((res) => res.json())
                .then((data) => {
                   document.getElementById("btnLoad").click();
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        return deleteBtn;
    }
}

attachEvents();