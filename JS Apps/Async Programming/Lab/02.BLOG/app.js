function attachEvents() {
    let posts = document.getElementById("posts");
    let postTitle = document.getElementById("post-title");
    let postBody = document.getElementById("post-body");
    let postComments = document.getElementById("post-comments");

    document.getElementById("btnLoadPosts").addEventListener("click", function () {
        posts.innerHTML = '';
        loadPosts();
    });
    document.getElementById("btnViewPost").addEventListener("click", function () {
        clearPostInfo();
        showPost(posts.value);
    });
    async function loadPosts(){
        let posts = await getPosts();
        generateOptions(posts);

    }
    async function showPost(id){
        let [post,comments] = await Promise.all([getPost(id),getComments()]);
        setPostInfo(post.title,post.body);
        Object.entries(comments).filter(([k,v]) => {
            
         return v.postId == post.id  ; 
        }).forEach(([k,v]) => {
            let li = document.createElement("li");
            li.setAttribute("id",v.id);
            li.innerHTML = v.text;
            postComments.appendChild(li);
        });
        
    }
    function getPosts() {
        return fetch("https://blog-apps-c12bf.firebaseio.com/posts.json")
            .then(res => {

                return res.json();
            })
    }
    function getPost(postId) {
        return fetch(`https://blog-apps-c12bf.firebaseio.com/posts/${postId}.json`)
            .then(res => {
                return res.json();
            });
    }
    function getComments() {
        return fetch(`https://blog-apps-c12bf.firebaseio.com/comments.json`)
            .then(res => {
                return res.json();
            })
    }
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
    function clearPostInfo(){
        postTitle.innerHTML = '';
        postBody.innerHTML = '';
        postComments.innerHTML = '';
    }
    function setPostInfo(postTitleData,postBodyData,postCommentsData){
        postTitle.innerHTML = postTitleData;
        postBody.innerHTML = postBodyData;
    }
}

attachEvents();