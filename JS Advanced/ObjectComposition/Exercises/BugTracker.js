function solve() {

    return (() => {
        let bugs = [];
        let ID = 0;
        let select = "";
        const report = function(author, description, reproducible, severity){
            bugs[ID] = {
                ID,
                author,
                description,
                reproducible,
                severity,
                status: 'Open'
            };
            ID++;
            draw();
        };
        const setStatus = function (id, newStatus) {
                bugs[id].status = newStatus;
            
            draw();
        
        };
        const remove = function (id) {
            bugs = bugs.filter(x => x.ID != id);
            draw();
        
        };
        const sort = function (method) {
            if (["author", "severity", "ID"].includes(method)) {
                bugs.sort((a, b) => {
                    if (typeof a == 'number') {
                        return a[method] - b[method];
                    } else {
                        return a[method].localeCompare(b[method]);
                    }
                })
            }
            draw();
        
        };
        const output = function (newSelector) {
            select = newSelector;
        };
        const draw = function () {
            document.querySelector(select).textContent = '';
            for (const bug of bugs) {
                let div = document.createElement("div");
                div.setAttribute("id", `report_${bug.ID}`);
                div.className = "report";

                let divBody = document.createElement("div");
                div.className = "body";
                let p = document.createElement("p");
                p.innerHTML = bug.description;
                divBody.appendChild(p);

                let divTitle = document.createElement("div");
                div.className = "title";
                let span = document.createElement("span");
                span.className = "author";
                span.innerHTML = `Submitted by: ${bug.author}`;
                divTitle.appendChild(span);

                div.appendChild(divBody);
                div.appendChild(divTitle);

                document.querySelector(select).appendChild(div);
            }
        }
        return {report,setStatus,remove,sort,output};
    })();
}