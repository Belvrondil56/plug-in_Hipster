let tabs = document.getElementsByClassName("tabs");
let content = document.getElementsByClassName("content")[0];

// get "/api/stories/tag/:tag" => "api/tags # find_stories_by_tags"
// get "/api/stories" => "api/stories_api # find_all_stories"
// http://127.0.0.1:3000/api/stories/tag/consequuntur

for (var i = 0; i < tabs.length; i++) {
    tabs.item(i).addEventListener("click", (e) => {
  
        let toFetch = e.currentTarget.getAttribute("id");

        console.log(toFetch)

        let selected = document.getElementsByClassName("selected")[0];
        selected.classList.remove("selected")

        let btn = document.getElementById(toFetch); 
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
    .then(response => response.json())
    .then(data => {
    
        console.log(data)
        
        content.innerHTML = ""
    
        data.forEach(element => {
            content.innerHTML +=
            `
                <div> ${element["title"]} </div>
            `
        });
    
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}