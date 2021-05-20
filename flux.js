// Add a star before the tag menu, if clicked, 
// we store the tag into a local variable to be reused by default next time
// the user comes back to this page

// localStorage.setItem('prefTag', TheTag);
// const prefTag = localStorage.getItem('prefTag');

let tabs = document.getElementsByClassName("tabs");
let content = document.getElementsByClassName("content")[0];

for (var i = 0; i < tabs.length; i++) {
    tabs.item(i).addEventListener("click", (e) => {

        let toFetch = e.currentTarget.getAttribute("id");

        console.log(toFetch)

        let selected = document.getElementsByClassName("selected")[0];
        selected.classList.remove("selected")

        let btn = document.getElementById(toFetch).children[0]; 
        btn.classList.add("selected")

        fetchFunc(toFetch)

    })
}

function fetchFunc(toFetch) {
    fetch('http://127.0.0.1:3000/'+toFetch+'.json', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'plain/text;charset=UTF-8'
        }
    })
    .then(content.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`)
    .then(response => response.json())
    .then(data => {
    
        console.log(data)
        
        // Empties the content before concatenating new content
        content.innerHTML = ""
    
        data.forEach(story => {
            date = new Date(story["created_at"])

            let tags = ""
            story["tags"].forEach(el => {
                tags += `<div class="tags">${el}</div>`            
            })

            content.innerHTML +=
            `
            <div class="story-wrapper">
                <div class="story">
                    <a href="${story["short_id_url"]}"> <h2 class="title">${story["title"]}</h2> </a>
                    <div class="author-date-wrapper">
                        <div class="tags-wrapper">
                            ${tags}
                        </div>
                        <div class="author"><strong>Auteur :</strong> ${story["submitter_user"]["username"]}</div>
                        <div class="date"><strong>Posté :</strong> il y a ${timeSince(date)}</div>
                    </div>
                    <div class="score-comments-wrapper">
                        <div class="score-wrapper">
                            <div class="score">${numFormatter(story["score"])}</div>
                            <img class="score-img" src="icons/like.png" alt="Likes" title="Likes">
                        </div>
                        <a href="${story["comments_url"]}" class="comment-wrapper">
                            <div class="comment">${numFormatter(story["comment_count"])}</div>
                            <img class="comment-img" src="icons/messenger.png" alt="Messages"  title="Messages">
                        </a>
                    </div>
                </div>
            </div>
            `
        });
    
    })
    .catch((error) => {
        console.error('Error:', error);
        content.innerHTML = ` <div>Une erreur est survenue, impossible de charger le contenu.</div> `
    });
}

function tagList(tags) {
    selectList = "";
    tags.forEach(tag => {
        selectList += ` <option class="tag" value="${tag["tag"]}">${tag["tag"]}</option> `;
    })
    return selectList;
}

function fetchTagFunc() {
    fetch('http://127.0.0.1:3000/tags.json', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'plain/text;charset=UTF-8' }
    })
    .then(content.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`)
    .then(response => response.json())
    .then(data => {
        content.innerHTML = `<select name="tags">`+ tagList(data) + `</select>`
    })
    .catch((error) => {
        console.error('Error:', error);
        content.innerHTML = ` <div>Une erreur est survenue, impossible de charger le contenu.</div> `
    });
}

// Default behavior when page loads
fetchFunc("newest")
// fetchTagFunc()