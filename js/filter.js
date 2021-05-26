buildTagList();

// Populates the datalist element with the list of available tags
function buildTagList() {
    fetch(appLink+'/tags.json')
    .then(response => response.json())
    .then(data => {
        const tagDatalist = document.getElementById("tag-list");
        tagDatalist.innerHTML = buildTagOptionList(data);
    })
    .catch((error) => { console.error('Error:', error); });
}

function buildTagOptionList(tagList) {
    tagOptionList = "";
    tagList.forEach(tag => {
        tagOptionList += 
            ` <option class="tag" value="${tag["tag"]}">${tag["tag"]}</option> `;
    })
    return tagOptionList;
}
// ---------------------------- //

const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function(e){
    e.preventDefault();

    const userSearch = searchInput.value; // Recupérer la valeur saisie par l'utilisateur

    // flux.js functions
    disableSelected()
    fetchFunc("t/"+userSearch);
});

searchInput.addEventListener("mouseenter", (e) => { e.currentTarget.focus() })