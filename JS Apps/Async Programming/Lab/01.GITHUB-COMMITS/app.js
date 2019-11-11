function loadCommits() {
    const username = document.getElementById('username');
    const repo = document.getElementById('repo');
    const ul = document.getElementById('commits');
    ul.innerHTML = '';
    fetch(`https://api.github.com/repos/${username.value}/${repo.value}/commits`)
        .then(res => {
            if (!res.ok || res.status >= 400) {
                throw new Error(res.status + " " + res.statusText);
            }
            return res.json()
        })
        .then(data => {
            buildList(data);
        })
        .catch(err => {

            handleError(err.message);
        });

    function buildList(data) {
        for (const commit of data) {
            ul.appendChild(createAuthor(commit.commit.author.name, commit.commit.message))
        }
    }
    function handleError(err) {
        ul.appendChild(createError(err));
    }
    function createError(err) {
        let li = document.createElement('li');
        li.innerHTML = `Error: (${err})`;

        return li;
    }

    function createAuthor(title, content) {
        let li = document.createElement('li');
        li.innerHTML = `${title}: ${content}`;

        return li;
    }
}