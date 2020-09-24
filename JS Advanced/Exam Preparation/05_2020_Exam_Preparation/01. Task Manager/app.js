
function solve() {
    const sections = document.getElementsByTagName("section");
    const addForm = document.getElementsByTagName("form")[0];
    
    addForm.addEventListener("submit",(event) => {
        event.preventDefault();
        const task = document.getElementById("task");
        const description = document.getElementById("description");
        const dueDate = document.getElementById("date");
        if(!task.value || !description.value || !dueDate.value){
            alert("Please complete the form");
            return;
        }
        sections[1].getElementsByTagName("div")[1]  .append(createArticle(task.value,description.value,dueDate.value,createStartBtn(),createDeleteBtn()));
    });

    
function createArticle(header,description,dueDate,...buttons){
    const article = document.createElement("article");

    const head = document.createElement("h3");
    head.innerText = header;

    const p1 = document.createElement("p");
    p1.innerText = "Description: "+description;

    const p2 = document.createElement("p");
    p2.innerText = "Due Date: "+dueDate;

    article.append(head);
    article.append(p1);
    article.append(p2);
    for(const bt of buttons){
        article.append(bt);
    }
    return article;
}

function createBtn(clazzName,text,callback){
    const btn = document.createElement("button");
    btn.className = clazzName;
    btn.innerText = text;
    btn.addEventListener("click",callback);
    return btn;
}

function createDeleteBtn(){
    return createBtn("red","Delete",(event) => {
        console.log("CALLED");
        event.target.parentElement.remove();
    })
}

function createStartBtn(){
    return createBtn("green","Start",(event) => {
        let article = event.target.parentElement.cloneNode(true);
        console.log(article);
        article.getElementsByTagName("button")[0].remove();
        article.getElementsByTagName("button")[0].remove();
        article.appendChild(createDeleteBtn());
        article.appendChild(createFinishBtn());
        sections[2].getElementsByTagName("div")[1].appendChild(article);
        event.target.parentElement.remove();
        
    })
}

function createFinishBtn(){
    return createBtn("orange","Finish",(event) => {
        let article = event.target.parentElement.cloneNode(true);
        article.getElementsByTagName("button")[0].remove();
        article.getElementsByTagName("button")[0].remove();
        sections[3].getElementsByTagName("div")[1].appendChild(article);
        event.target.parentElement.remove();
    })
}
   
}
