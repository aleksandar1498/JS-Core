function attachEvents() {
    let posts = document.getElementById("posts");
    let postTitle = document.getElementById("post-title");
    let postBody = document.getElementById("post-body");
    let postComments = document.getElementById("post-body");
    document.getElementById("btnLoadPosts").addEventListener("click", function () {
        posts.innerHTML = '';
        fetch("https://blog-apps-c12bf.firebaseio.com/posts.json")
            .then(res => {
                if (!res.ok || res.status >= 400) {
                    throw new Error(res.status + " " + res.statusText);
                }
                return res.json();
            })
            .then(data => {
                generateOptions(data);

            })
            .catch(err => console.log(err.message));
    });
    document.getElementById("btnViewPost").addEventListener("click", function () {
        fetch(`https://blog-apps-c12bf.firebaseio.com/comments.json`)
        .then(res => {
            if (!res.ok || res.status >= 400) {
                throw new Error(res.status + " " + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            for (const commentId of data) {
                if(data[commentId].postId)
                let li = document.createElement("li");
                //li.innerHTML = commentId.
                postComments.appendChild()
            }
            

        })
        .catch(err => console.log(err.message));

        fetch(`https://blog-apps-c12bf.firebaseio.com/posts/${posts.value}.json`)
        .then(res => {
            if (!res.ok || res.status >= 400) {
                throw new Error(res.status + " " + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            postTitle.innerHTML = data.title;
            postBody.innerHTML = data.body;

        })
        .catch(err => console.log(err.message));
        
    });
    //https://blog-apps-c12bf.firebaseio.com/comments/-LhdewtO2lJrzuThWlMj.json
    //https://blog-apps-c12bf.firebaseio.com/posts/-LhdewtO2lJrzuThWlMj.json
    function generateOptions(data) {
        let fragment = document.createDocumentFragment();
        for (const option in data) {
            fragment.appendChild(generateOption(option, data[option].title));
        }
        posts.appendChild(fragment);
    }
    function generateOption(value, content) {
        let option = document.createElement("option");
        option.setAttribute("value", value);
        option.innerHTML = content;
        return option;
    }
}

attachEvents();