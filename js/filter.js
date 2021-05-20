buildTagList();

// Populates the datalist element with the list of available tags
function buildTagList() {
    fetch('http://127.0.0.1:3000/tags.json')
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


//NOT WORKING YET Opens the autocomplete menu on focus
document.getElementById("search-input").addEventListener("focus", (e) => {
    console.log(e.currentTarget)
    e.currentTarget.focus()
})
// ---------------------------- //