let redirectionBtn = document.getElementById("redirection")
redirectionBtn.addEventListener("click", function(e) {
    browser.tabs.create({
        url:"https://hipsters-feed.herokuapp.com"
    });
})