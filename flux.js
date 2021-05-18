let content = document.getElementById("posts");

// get "/api/stories/tag/:tag" => "api/tags # find_stories_by_tags"
// get "/api/stories" => "api/stories_api # find_all_stories"
// http://127.0.0.1:3000/api/stories/tag/consequuntur

fetch('http://127.0.0.1:3000/newest.json', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'plain/text;charset=UTF-8'
    }
})
.then(response => response.json())
.then(data => {

    console.log(data)
    
    content.innerHTML = ""

    data.forEach(element => {
        content.innerHTML +=
        `
            <p> ${element["title"]} </p>
        `         
    });

})
.catch((error) => {
    console.error('Error:', error);
});
