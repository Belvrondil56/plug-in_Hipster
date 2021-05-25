const tabs = document.getElementsByClassName("tabs");
const content = document.getElementsByClassName("content")[0];

for (var i = 0; i < tabs.length; i++) {
    tabs.item(i).addEventListener("click", (e) => {

        disableSelected()

        let toFetch = e.currentTarget.getAttribute("id");

        // Adds the selected class to the tab that has been pressed using its id attribute
        let btn = document.getElementById(toFetch).children[0]; 
        if (btn) { btn.classList.add("selected") }

        fetchFunc(toFetch)
    })
}

function disableSelected() { // Disables the tab that has the selected class if there is one
    let selected = document.getElementsByClassName("selected")[0];
    if (selected) { selected.classList.remove("selected") }
}

function fetchFunc(toFetch) {
    fetch(appLink+'/'+toFetch+'.json', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'plain/text;charset=UTF-8'
        }
    })
    .then(content.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`)
    .then(response => response.json())
    .then(data => {
        let storyList = ""
        data.forEach(story => {
            date = new Date(story["created_at"])
            
            storyList +=
            `
            <div class="story-wrapper">
                <div class="story">
                    <a href="${story["url"]}"> <h2 class="title">${story["title"]}</h2> </a>
                    <div class="author-date-wrapper">
                        <div class="tags-wrapper">
                            ${getStoryTags(story)}
                        </div>
                        <div class="author"><strong>Auteur :</strong><a href="${appLink + '/u/' + story["submitter_user"]["username"]}"> ${story["submitter_user"]["username"]}</a></div>
                        <div class="date"><strong>Posté :</strong> il y a ${timeSince(date)}</div>
                    </div>
                    <div class="score-comments-wrapper">
                        <div class="score-wrapper">
                            <div class="score">${numFormatter(story["score"])}</div>
                            <img class="score-img" src="icons/like.svg" alt="J'aimes" title="J'aimes">
                        </div>
                        <a href="${appLink+story["comments_url"].replace("https://example.com", '')}" class="comment-wrapper">
                            <div class="comment">${numFormatter(story["comment_count"])}</div>
                            <img class="comment-img" src="icons/comment.svg" alt="Commentaires"  title="Commentaires">
                        </a>
                    </div>
                </div>
            </div>
            `
        });
        content.innerHTML = storyList;    
    })
    .catch((error) => {
        console.error('Error:', error);
        content.innerHTML = ` <div>Aucun résultat</div> `
    });
}

function getStoryTags(story) {
    // Returns an array of tag nodes to append into the story element
    let tags = ""
    story["tags"].forEach(el => {
        tags += `<a href="${appLink}/t/${el}" class="tags">${el}</a>` 
    })
    return tags
}

// ----- Default behavior when page loads -----
tabs[0].click() // Clicks on button "Nouveau" and triggers the function fetchFunc("newest")