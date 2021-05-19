// Init the tag list
buildTagList();

////////////////////////////////////////////
// Definition of methods
///////////////////////////////////////////
function buildTagList() {
    fetch('http://127.0.0.1:3000/tags.json')
    .then(response => response.json())
    .then(data => {
        const tagDatalist = document.getElementById("tag-list");
        tagDatalist.innerHTML = buildTagOptionList(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function buildTagOptionList(tagList) {
    tagOptionList = "";
    tagList.forEach(tag => {
        tagOptionList += 
        `
            <option class="tag" value="${tag["tag"]}">${tag["tag"]}</option>
        `;
    })
    return tagOptionList;
}
