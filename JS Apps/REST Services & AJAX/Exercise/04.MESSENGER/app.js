function attachEvents() {
    let author = document.getElementById("author");
    let content = document.getElementById("content");

    let submitBtn = document.getElementById("submit");
    let refreshBtn = document.getElementById("refresh");

    let messages = document.getElementById("messages");
    submitBtn.addEventListener("click", () => {
        sendMessage(author.value, content.value);
        refreshMessages();
    });

    refreshBtn.addEventListener("click", () => {
        refreshMessages();
    });
    function sendMessage(author, content) {
        

        fetch("https://rest-messanger.firebaseio.com/messanger.json", {
            method: "post",
            body: JSON.stringify({
                author,
                content,
                timestamp: Date.now()
            })

        }).then(
            (res) => res.json()
        ).then((data) => {
            clearData();
           
        })
            .catch((err) => {
                console.log("err");

            });
    }
    function refreshMessages() {
        fetch("https://rest-messanger.firebaseio.com/messanger.json")
            .then((res) => res.json())
            .then((data) => {
                let sorted = {};
                Object.keys(data).sort((a,b) => a.timestamp - b.timestamp).forEach(k => sorted[k] = data[k]);
                for (const key in sorted) {
                    messages.append(`${data[key].author}: ${data[key].content}\n`);    
                }
              
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function clearData(){
        console.log("called");
        author.value = '';
        content.value = '';
    }
}

attachEvents();