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
            let date = new Date(story["created_at"])
            console.log(story)
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
                            <svg class="score-img" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g><g> <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514C512,93.417,453.532,30,376,30z"/></g></g> </svg>
                        </div>
                        <a href="${story["comments_url"]}" class="comment-wrapper">
                            <div class="comment">${numFormatter(story["comment_count"])}</div>
                            <svg class="comment-img" enable-background="new 0 0 511.096 511.096" height="512" viewBox="0 0 511.096 511.096" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Speech_Bubble_48_"><g><path d="m74.414 480.548h-36.214l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-59.127-38.802-88.554-95.014-88.554-153.944 0-108.719 99.923-219.203 256.414-219.203 165.785 0 254.682 101.666 254.682 209.678 0 108.724-89.836 210.322-254.682 210.322-28.877 0-59.01-3.855-85.913-10.928-25.467 26.121-59.973 40.928-96.087 40.928z"/></g></g></svg>
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