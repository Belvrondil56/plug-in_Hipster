const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function(e){
    e.preventDefault();

    const userSearch = searchInput.value; // Recupérer la valeur saisie par l'utilisateur

    findStoriesByTag(userSearch);
});

function findStoriesByTag(tagName) {
    fetch('http://127.0.0.1:3000/stories/tag/'+tagName+'.json', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'plain/text;charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(data => {
        const content = document.getElementsByClassName("content")[0];
        let storyList = "";
    
        data.forEach(element => {
            storyList +=
            `
                <div> ${element["title"]} </div>
            `
        });
        content.innerHTML = storyList;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
